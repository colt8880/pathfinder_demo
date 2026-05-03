"use client";

import { EncounterNote } from "@/lib/types";
import HighlightTooltip from "./highlight-tooltip";

type Segment = { text: string; isHighlight: false } | { text: string; isHighlight: true; signal: string };

function buildSegments(body: string, phrases: { phrase: string; signal: string }[]): Segment[] {
  // Find all phrase positions in the text (case-insensitive match)
  const matches: { start: number; end: number; phrase: string; signal: string }[] = [];

  for (const { phrase, signal } of phrases) {
    const lowerBody = body.toLowerCase();
    const lowerPhrase = phrase.toLowerCase();
    let searchFrom = 0;
    while (true) {
      const idx = lowerBody.indexOf(lowerPhrase, searchFrom);
      if (idx === -1) break;
      matches.push({ start: idx, end: idx + phrase.length, phrase: body.slice(idx, idx + phrase.length), signal });
      searchFrom = idx + phrase.length;
    }
  }

  // Sort by position
  matches.sort((a, b) => a.start - b.start);

  // Build segments, avoiding overlaps
  const segments: Segment[] = [];
  let cursor = 0;

  for (const match of matches) {
    if (match.start < cursor) continue; // skip overlap
    if (match.start > cursor) {
      segments.push({ text: body.slice(cursor, match.start), isHighlight: false });
    }
    segments.push({ text: match.phrase, isHighlight: true, signal: match.signal });
    cursor = match.end;
  }

  if (cursor < body.length) {
    segments.push({ text: body.slice(cursor), isHighlight: false });
  }

  return segments;
}

export default function HighlightedNote({ note }: { note: EncounterNote }) {
  const segments = buildSegments(note.body, note.evidencePhrases);

  return (
    <div className="rounded-md border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
      <h2 className="mb-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        Encounter Note
      </h2>
      <p className="mb-4 text-xs text-zinc-500">
        {note.date} &mdash; {note.authorTitle}
      </p>
      <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        {segments.map((seg, i) =>
          seg.isHighlight ? (
            <HighlightTooltip key={i} phrase={seg.text} signal={seg.signal} />
          ) : (
            <span key={i}>{seg.text}</span>
          )
        )}
      </pre>
    </div>
  );
}
