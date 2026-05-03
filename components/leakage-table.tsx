"use client";

import { useState } from "react";
import { ReferralEvent } from "@/lib/types";

type SortKey = "date" | "specialty" | "estimatedDownstreamValue";
type SortDir = "asc" | "desc";

export default function LeakageTable({
  events,
}: {
  events: ReferralEvent[];
}) {
  const leaked = events.filter((e) => e.outcome === "leaked");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  const sorted = [...leaked].sort((a, b) => {
    let cmp = 0;
    if (sortKey === "date") cmp = a.date.localeCompare(b.date);
    else if (sortKey === "specialty") cmp = a.specialty.localeCompare(b.specialty);
    else cmp = a.estimatedDownstreamValue - b.estimatedDownstreamValue;
    return sortDir === "asc" ? cmp : -cmp;
  });

  function sortIndicator(key: SortKey) {
    if (sortKey !== key) return "";
    return sortDir === "asc" ? " \u25B2" : " \u25BC";
  }

  return (
    <div className="rounded-md border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">
      <div className="px-5 py-3 border-b border-zinc-200 dark:border-zinc-700">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Leaked Referrals
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800">
              <th className="px-4 py-2 text-left font-medium text-zinc-500">
                ID
              </th>
              <th
                className="px-4 py-2 text-left font-medium text-zinc-500 cursor-pointer hover:text-zinc-900 dark:hover:text-zinc-100"
                onClick={() => handleSort("date")}
              >
                Date{sortIndicator("date")}
              </th>
              <th
                className="px-4 py-2 text-left font-medium text-zinc-500 cursor-pointer hover:text-zinc-900 dark:hover:text-zinc-100"
                onClick={() => handleSort("specialty")}
              >
                Specialty{sortIndicator("specialty")}
              </th>
              <th className="px-4 py-2 text-left font-medium text-zinc-500">
                Sub-specialty
              </th>
              <th
                className="px-4 py-2 text-right font-medium text-zinc-500 cursor-pointer hover:text-zinc-900 dark:hover:text-zinc-100"
                onClick={() => handleSort("estimatedDownstreamValue")}
              >
                Est. Value{sortIndicator("estimatedDownstreamValue")}
              </th>
              <th className="px-4 py-2 text-left font-medium text-zinc-500">
                Leaked To
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((e) => (
              <tr
                key={e.id}
                className="border-b border-zinc-100 dark:border-zinc-800"
              >
                <td className="px-4 py-2 text-zinc-500">{e.patientIdRedacted}</td>
                <td className="px-4 py-2 text-zinc-700 dark:text-zinc-300">
                  {e.date}
                </td>
                <td className="px-4 py-2 text-zinc-700 dark:text-zinc-300">
                  {e.specialty}
                </td>
                <td className="px-4 py-2 text-zinc-700 dark:text-zinc-300">
                  {e.subSpecialty}
                </td>
                <td className="px-4 py-2 text-right text-zinc-700 dark:text-zinc-300">
                  ${e.estimatedDownstreamValue.toLocaleString()}
                </td>
                <td className="px-4 py-2 text-red-600 dark:text-red-400">
                  {e.leakedTo}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
