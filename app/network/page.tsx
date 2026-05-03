import { referralEvents } from "@/lib/data/leakage";
import MetricTile from "@/components/metric-tile";
import LeakageBySpecialty from "@/components/leakage-by-specialty";
import LeakageTable from "@/components/leakage-table";
import RecommendedAction from "@/components/recommended-action";

export default function NetworkView() {
  const total = referralEvents.length;
  const captured = referralEvents.filter((e) => e.outcome === "captured").length;
  const leaked = referralEvents.filter((e) => e.outcome === "leaked");
  const captureRate = Math.round((captured / total) * 100);
  const revenueAtRisk = leaked.reduce(
    (sum, e) => sum + e.estimatedDownstreamValue,
    0
  );
  const specialties = new Set(referralEvents.map((e) => e.specialty));

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="mx-auto max-w-4xl space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
              Network Intelligence
            </h1>
            <p className="mt-1 text-sm text-zinc-500">Last 30 days.</p>
          </div>
          <span className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900">
            Filter: All specialties
          </span>
        </div>

        {/* Metric tiles */}
        <div className="flex gap-4">
          <MetricTile
            label="Total Referrals"
            value={total.toString()}
            subtext={`Across ${specialties.size} specialties`}
          />
          <MetricTile
            label="Capture Rate"
            value={`${captureRate}%`}
            subtext="20% below benchmark"
            subtextColor="red"
          />
          <MetricTile
            label="Revenue at Risk"
            value={`$${Math.round(revenueAtRisk / 1000)}K`}
            subtext="30 day trailing"
          />
        </div>

        {/* Leakage by specialty */}
        <LeakageBySpecialty events={referralEvents} />

        {/* Leaked referrals table */}
        <LeakageTable events={referralEvents} />

        {/* Recommended action */}
        <RecommendedAction events={referralEvents} />
      </div>
    </div>
  );
}
