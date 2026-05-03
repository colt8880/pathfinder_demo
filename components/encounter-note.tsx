import { EncounterNote } from "@/lib/types";

export default function EncounterNoteDisplay({ note }: { note: EncounterNote }) {
  return (
    <div className="rounded-md border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
      <h2 className="mb-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        Today&apos;s Encounter Note
      </h2>
      <p className="mb-4 text-xs text-zinc-500">
        {note.date} &mdash; {note.authorTitle}
      </p>
      <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        {note.body}
      </pre>
    </div>
  );
}
