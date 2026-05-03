import { ReferralEvent } from "@/lib/types";

export default function RecommendedAction({
  events,
}: {
  events: ReferralEvent[];
}) {
  // Derive the concentrated leakage pattern from data
  const leakedToCount = new Map<string, { count: number; value: number; subSpecialty: string }>();
  for (const e of events) {
    if (e.outcome === "leaked" && e.leakedTo) {
      const current = leakedToCount.get(e.leakedTo) ?? { count: 0, value: 0, subSpecialty: e.subSpecialty };
      current.count++;
      current.value += e.estimatedDownstreamValue;
      leakedToCount.set(e.leakedTo, current);
    }
  }

  // Find the worst offender
  let topTarget = { name: "", count: 0, value: 0, subSpecialty: "" };
  for (const [name, data] of leakedToCount) {
    if (data.count > topTarget.count) {
      topTarget = { name, ...data };
    }
  }

  const valueFormatted = `$${Math.round(topTarget.value / 1000).toLocaleString()},000`;

  return (
    <div className="rounded-lg border border-amber-300 bg-amber-50 p-5 dark:border-amber-700 dark:bg-amber-950/30">
      <h3 className="text-sm font-bold text-amber-900 dark:text-amber-200">
        Recommended Action
      </h3>
      <p className="mt-2 text-sm text-amber-800 leading-relaxed dark:text-amber-300">
        {topTarget.count} {topTarget.subSpecialty.toLowerCase()} referrals leaked
        to {topTarget.name} in the last 30 days, totaling{" "}
        {valueFormatted} in lost downstream revenue. Consider hiring a
        fellowship-trained shoulder specialist or pursuing a partnership with the
        group.
      </p>
      <div className="mt-4 flex items-center gap-3">
        <button
          className="rounded-md bg-amber-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-amber-700"
          title="Demo only"
        >
          Create hiring request
        </button>
        <button
          className="rounded-md border border-amber-300 bg-white px-4 py-2 text-xs font-medium text-amber-800 transition-colors hover:bg-amber-50 dark:border-amber-600 dark:bg-amber-900/30 dark:text-amber-200"
          title="Demo only"
        >
          Flag for partnership review
        </button>
        <span className="text-xs text-amber-500">Demo only</span>
      </div>
    </div>
  );
}
