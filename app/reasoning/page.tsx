import Link from "next/link";
import { getNote } from "@/lib/data/notes";
import { getMockInference } from "@/lib/inference";
import HighlightedNote from "@/components/highlighted-note";
import EvidencePanel from "@/components/evidence-panel";

const PATIENT_ID = "pat-001";

export default function ReasoningView() {
  const note = getNote(PATIENT_ID)!;
  const inference = getMockInference(PATIENT_ID)!;

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="mx-auto max-w-3xl space-y-5">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
            Clinical Reasoning
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            How Pathfinder inferred shoulder sub-specialty for Tom Bauer.
          </p>
        </div>

        {/* Highlighted note */}
        <HighlightedNote note={note} />

        {/* Evidence panel */}
        <EvidencePanel inference={inference} />

        {/* Back link */}
        <div className="pt-2">
          <Link
            href="/pcp"
            className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            &larr; Back to PCP view
          </Link>
        </div>
      </div>
    </div>
  );
}
