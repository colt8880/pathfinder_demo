import { NextRequest, NextResponse } from "next/server";
import { getNote } from "@/lib/data/notes";
import { specialists } from "@/lib/data/specialists";
import { getMockInference } from "@/lib/inference";
import { getClient } from "@/lib/anthropic";
import { SYSTEM_PROMPT, buildUserPrompt } from "@/lib/prompts";
import { InferenceResult } from "@/lib/types";

export async function POST(request: NextRequest) {
  const { patientId } = await request.json();
  const note = getNote(patientId);
  const fallback = getMockInference(patientId);

  if (!note || !fallback) {
    return NextResponse.json(
      { error: "Patient not found" },
      { status: 404 }
    );
  }

  const client = getClient();
  if (!client) {
    // No API key, return mock
    return NextResponse.json(fallback);
  }

  try {
    // Get unique sub-specialties from specialist directory
    const validSubSpecialties = [
      ...new Set(specialists.map((s) => s.subSpecialty)),
    ];

    const userPrompt = buildUserPrompt(note.body, validSubSpecialties);

    const response = await Promise.race([
      client.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 500,
        temperature: 0,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: userPrompt }],
      }),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), 10000)
      ),
    ]);

    // Extract text from response
    const textBlock = response.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      console.error("F07: No text block in response");
      return NextResponse.json(fallback);
    }

    // Extract JSON object from response (handles code fences, preamble, etc.)
    const raw = textBlock.text;
    const start = raw.indexOf("{");
    const end = raw.lastIndexOf("}");
    if (start === -1 || end === -1) {
      console.error("F07: No JSON object found in response");
      return NextResponse.json(fallback);
    }
    const jsonText = raw.slice(start, end + 1);

    // Parse the JSON response
    const parsed = JSON.parse(jsonText) as {
      subSpecialty: string;
      confidence: number;
      rationale: string;
      evidencePhrases: string[];
    };

    // Rank specialists server-side based on inferred sub-specialty
    const rankedSpecialists = specialists
      .filter((s) => s.subSpecialty === parsed.subSpecialty)
      .sort((a, b) => b.fitScore - a.fitScore)
      .slice(0, 3);

    // If no specialists match (LLM returned unexpected sub-specialty), fall back
    if (rankedSpecialists.length === 0) {
      console.error(
        "F07: No specialists match inferred sub-specialty:",
        parsed.subSpecialty
      );
      return NextResponse.json(fallback);
    }

    const result: InferenceResult = {
      subSpecialty: parsed.subSpecialty,
      confidence: parsed.confidence,
      rationale: parsed.rationale,
      evidencePhrases: parsed.evidencePhrases,
      rankedSpecialists,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("F07: Inference error, returning fallback:", error);
    return NextResponse.json(fallback);
  }
}
