import { InferenceResult } from "@/lib/types";

const rejectedSubSpecialties = [
  {
    name: "Hip & Knee",
    reason:
      "No findings related to lower extremity joints. Pain is localized to the shoulder with no hip or knee complaints.",
  },
  {
    name: "Spine",
    reason:
      "No radicular symptoms, no neck or back pain, no neurological deficits in dermatomal distribution. Presentation is isolated to the shoulder.",
  },
  {
    name: "Hand & Wrist",
    reason:
      "No distal upper extremity findings. Pain and weakness are proximal, centered on the rotator cuff and subacromial space.",
  },
];

export default function EvidencePanel({
  inference,
}: {
  inference: InferenceResult;
}) {
  return (
    <div className="space-y-6 rounded-md border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
      {/* Inference summary */}
      <div>
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Inferred sub-specialty:{" "}
          <span className="text-blue-600 dark:text-blue-400">
            {inference.subSpecialty.split(" - ")[1] ?? inference.subSpecialty}
          </span>
          <span className="ml-2 text-xs font-medium text-zinc-500">
            {Math.round(inference.confidence * 100)}% confidence
          </span>
        </h3>
        <p className="mt-1 text-xs text-zinc-500 leading-relaxed">
          {inference.rationale}
        </p>
      </div>

      {/* Evidence found */}
      <div>
        <h3 className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Evidence found
        </h3>
        <ul className="space-y-2">
          {inference.evidencePhrases.map((phrase, i) => (
            <li key={i} className="flex items-start gap-2 text-xs">
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
              <span className="rounded bg-amber-50 px-1.5 py-0.5 font-medium text-amber-900 dark:bg-amber-900/30 dark:text-amber-200">
                &ldquo;{phrase}&rdquo;
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Why not other sub-specialties */}
      <div>
        <h3 className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Why not other sub-specialties
        </h3>
        <div className="space-y-2">
          {rejectedSubSpecialties.map((sub) => (
            <div key={sub.name} className="text-xs">
              <span className="font-medium text-zinc-700 dark:text-zinc-300">
                {sub.name}:
              </span>{" "}
              <span className="text-zinc-500">{sub.reason}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
