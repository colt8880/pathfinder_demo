import { ReferralEvent } from "@/lib/types";

type SpecialtyRow = {
  specialty: string;
  captured: number;
  leaked: number;
  total: number;
};

function computeBySpecialty(events: ReferralEvent[]): SpecialtyRow[] {
  const map = new Map<string, { captured: number; leaked: number }>();
  for (const e of events) {
    const current = map.get(e.specialty) ?? { captured: 0, leaked: 0 };
    if (e.outcome === "captured") current.captured++;
    else current.leaked++;
    map.set(e.specialty, current);
  }
  return Array.from(map.entries())
    .map(([specialty, counts]) => ({
      specialty,
      ...counts,
      total: counts.captured + counts.leaked,
    }))
    .sort((a, b) => b.leaked - a.leaked);
}

export default function LeakageBySpecialty({
  events,
}: {
  events: ReferralEvent[];
}) {
  const rows = computeBySpecialty(events);
  const maxTotal = Math.max(...rows.map((r) => r.total));

  return (
    <div className="rounded-md border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
      <h3 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        Leakage by Specialty
      </h3>
      <div className="space-y-3">
        {rows.map((row) => {
          const barWidth = (row.total / maxTotal) * 100;
          const capturedWidth = (row.captured / row.total) * 100;
          return (
            <div key={row.specialty}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">
                  {row.specialty}
                </span>
                <span className="text-zinc-500">
                  {row.captured} captured / {row.leaked} leaked
                </span>
              </div>
              <div
                className="flex h-4 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800"
                style={{ width: `${barWidth}%` }}
              >
                <div
                  className="bg-emerald-500 dark:bg-emerald-600"
                  style={{ width: `${capturedWidth}%` }}
                />
                <div className="flex-1 bg-red-400 dark:bg-red-500" />
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex items-center gap-4 text-xs text-zinc-500">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" />
          Captured
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-red-400" />
          Leaked
        </span>
      </div>
    </div>
  );
}
