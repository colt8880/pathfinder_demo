"use client";

import { EncounterNote as NoteType } from "@/lib/types";
import { Copy, Printer } from "lucide-react";
import Card from "./ui/card";
import Button from "./ui/button";

function Hi({
  children,
  highlight,
}: {
  children: React.ReactNode;
  highlight: boolean;
}) {
  if (!highlight) return <>{children}</>;
  return (
    <mark
      style={{
        background: "rgba(37,99,235,0.10)",
        color: "inherit",
        padding: "1px 4px",
        borderRadius: 3,
        borderBottom: "1px solid rgba(37,99,235,0.5)",
        transition: "background var(--duration-fast)",
      }}
    >
      {children}
    </mark>
  );
}

function highlightBody(
  body: string,
  phrases: { phrase: string; signal: string }[],
  highlight: boolean
): React.ReactNode[] {
  if (!highlight) return [body];

  const matches: { start: number; end: number; phrase: string }[] = [];
  const lowerBody = body.toLowerCase();
  for (const { phrase } of phrases) {
    const idx = lowerBody.indexOf(phrase.toLowerCase());
    if (idx !== -1) {
      matches.push({ start: idx, end: idx + phrase.length, phrase: body.slice(idx, idx + phrase.length) });
    }
  }
  matches.sort((a, b) => a.start - b.start);

  const segments: React.ReactNode[] = [];
  let cursor = 0;
  for (const m of matches) {
    if (m.start < cursor) continue;
    if (m.start > cursor) segments.push(body.slice(cursor, m.start));
    segments.push(
      <Hi key={m.start} highlight={true}>
        {m.phrase}
      </Hi>
    );
    cursor = m.end;
  }
  if (cursor < body.length) segments.push(body.slice(cursor));
  return segments;
}

function splitSOAP(body: string): { label: string; content: string }[] {
  // Split on CC:/HPI:/Exam:/Assessment:/Plan: patterns from the note
  const sections: { label: string; content: string }[] = [];
  const lines = body.split("\n");
  let currentLabel = "Subjective";
  let currentLines: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("CC:") || trimmed.startsWith("HPI:")) {
      if (currentLines.length > 0) {
        sections.push({ label: currentLabel, content: currentLines.join("\n").trim() });
        currentLines = [];
      }
      currentLabel = "Subjective";
      currentLines.push(trimmed);
    } else if (trimmed.startsWith("Exam:")) {
      if (currentLines.length > 0) {
        sections.push({ label: currentLabel, content: currentLines.join("\n").trim() });
        currentLines = [];
      }
      currentLabel = "Objective";
      currentLines.push(trimmed);
    } else if (trimmed.startsWith("Assessment:")) {
      if (currentLines.length > 0) {
        sections.push({ label: currentLabel, content: currentLines.join("\n").trim() });
        currentLines = [];
      }
      currentLabel = "Assessment";
      currentLines.push(trimmed);
    } else if (trimmed.startsWith("Plan:")) {
      if (currentLines.length > 0) {
        sections.push({ label: currentLabel, content: currentLines.join("\n").trim() });
        currentLines = [];
      }
      currentLabel = "Plan";
      currentLines.push(trimmed);
    } else {
      currentLines.push(line);
    }
  }
  if (currentLines.length > 0) {
    sections.push({ label: currentLabel, content: currentLines.join("\n").trim() });
  }
  return sections;
}

export default function EncounterNoteDisplay({
  note,
  highlight = false,
}: {
  note: NoteType;
  highlight?: boolean;
}) {
  const sections = splitSOAP(note.body);

  return (
    <Card
      title="Encounter note"
      meta={`${note.date} · ${note.authorTitle}`}
      action={
        <div style={{ display: "flex", gap: 6 }}>
          <Button variant="ghost" size="sm" icon={Copy}>
            Copy
          </Button>
          <Button variant="ghost" size="sm" icon={Printer}>
            Print
          </Button>
        </div>
      }
      padding={20}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          font: "400 14px/22px var(--font-sans)",
          color: "var(--ink-primary)",
        }}
      >
        {sections.map((section) => (
          <div key={section.label}>
            <div className="op-eyebrow" style={{ marginBottom: 4 }}>
              {section.label}
            </div>
            <p style={{ margin: 0, whiteSpace: "pre-wrap" }}>
              {highlightBody(section.content, note.evidencePhrases, highlight)}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
