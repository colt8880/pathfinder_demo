"use client";

import { Specialist } from "@/lib/types";

export default function SpecialistRow({
  specialist,
  rank,
  isTopRanked,
  onSchedule,
  scheduled,
}: {
  specialist: Specialist;
  rank: number;
  isTopRanked: boolean;
  onSchedule: () => void;
  scheduled: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between rounded-md border px-4 py-3 ${
        isTopRanked
          ? "border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/30"
          : "border-zinc-150 bg-white dark:border-zinc-700 dark:bg-zinc-900"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-100 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
          {rank}
        </span>
        <div>
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            {specialist.name}
          </p>
          <p className="text-xs text-zinc-500">
            {specialist.subSpecialty} &mdash; {specialist.practiceName}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4 text-xs text-zinc-500">
        <span>{specialist.distanceMiles} mi</span>
        <span>
          {specialist.nextAvailableDays === 1
            ? "1 day"
            : `${specialist.nextAvailableDays} days`}
        </span>
        <span className="rounded-full bg-green-100 px-2 py-0.5 text-green-700 dark:bg-green-900 dark:text-green-300">
          In-network
        </span>
        {isTopRanked && (
          scheduled ? (
            <span className="rounded-md bg-green-600 px-3 py-1.5 text-xs font-medium text-white">
              Scheduled
            </span>
          ) : (
            <button
              onClick={onSchedule}
              className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700"
            >
              Schedule with {specialist.name.split(" ").slice(0, 2).join(" ")}
            </button>
          )
        )}
      </div>
    </div>
  );
}
