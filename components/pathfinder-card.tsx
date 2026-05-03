"use client";

import { useState } from "react";
import Link from "next/link";
import { InferenceResult } from "@/lib/types";
import SpecialistRow from "./specialist-row";

export default function PathfinderCard({
  inference,
  loading,
  source,
  progressStep,
  onRun,
}: {
  inference: InferenceResult | null;
  loading?: boolean;
  source?: "live" | "mock" | null;
  progressStep?: string;
  onRun?: () => void;
}) {
  const [scheduled, setScheduled] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  return (
    <div className="rounded-lg border border-blue-200 bg-gradient-to-b from-blue-50/80 to-white shadow-sm dark:border-blue-900 dark:from-blue-950/40 dark:to-zinc-900">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-blue-100 px-5 py-3 dark:border-blue-900">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600 text-xs font-bold text-white">
            P
          </div>
          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Pathfinder
          </span>
          {source && (
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                source === "live"
                  ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                  : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
              }`}
            >
              {source === "live" ? "Live AI" : "Mock fallback"}
            </span>
          )}
        </div>
        {!loading && inference && (
          <button
            onClick={() => setShowHowItWorks(!showHowItWorks)}
            className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            {showHowItWorks ? "Dismiss" : "How this works"}
          </button>
        )}
      </div>

      {/* How this works callout */}
      {showHowItWorks && !loading && (
        <div className="border-b border-blue-100 bg-blue-50 px-5 py-3 text-xs text-blue-800 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-300">
          Pathfinder reads the encounter note at the moment of referral order
          entry, infers the optimal sub-specialty, and ranks in-network
          specialists by clinical fit. This is a prototype with synthetic data.
        </div>
      )}

      <div className="space-y-4 px-5 py-4">
        {/* Idle state: show run button */}
        {!loading && !inference && (
          <div className="flex flex-col items-center gap-3 py-4">
            <p className="text-sm text-zinc-500">
              Pathfinder can analyze this encounter note and recommend a
              sub-specialty referral.
            </p>
            <button
              onClick={onRun}
              className="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              Run Pathfinder
            </button>
          </div>
        )}

        {/* Loading state with progress steps */}
        {loading && (
          <div className="py-4">
            <div className="flex items-center gap-3">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
              <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {progressStep}
              </p>
            </div>
          </div>
        )}

        {/* Loaded content */}
        {!loading && inference && (
          <>
            {scheduled ? (
              <div className="rounded-md border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/30">
                <p className="text-sm font-medium text-green-800 dark:text-green-300">
                  Appointment scheduled with{" "}
                  {inference.rankedSpecialists[0].name}
                </p>
                <p className="mt-1 text-xs text-green-600 dark:text-green-400">
                  {inference.rankedSpecialists[0].practiceName} &mdash;{" "}
                  {inference.rankedSpecialists[0].distanceMiles} miles &mdash;
                  Next available in{" "}
                  {inference.rankedSpecialists[0].nextAvailableDays} days
                </p>
                <p className="mt-2 text-xs font-medium text-green-700 dark:text-green-300">
                  Done
                </p>
              </div>
            ) : (
              <>
                <div>
                  <p className="text-sm text-zinc-900 dark:text-zinc-100">
                    Pathfinder recommends:{" "}
                    <span className="font-semibold">
                      {inference.subSpecialty.split(" - ")[1] ??
                        inference.subSpecialty}
                    </span>{" "}
                    <span className="ml-1 text-xs font-medium text-blue-600 dark:text-blue-400">
                      {Math.round(inference.confidence * 100)}% confidence
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-zinc-500 leading-relaxed">
                    {inference.rationale}
                  </p>
                </div>

                <div className="space-y-2">
                  {inference.rankedSpecialists.slice(0, 3).map((specialist, i) => (
                    <SpecialistRow
                      key={specialist.id}
                      specialist={specialist}
                      rank={i + 1}
                      isTopRanked={i === 0}
                      onSchedule={() => setScheduled(true)}
                      scheduled={false}
                    />
                  ))}
                </div>
              </>
            )}

            <div className="flex items-center gap-4 border-t border-blue-100 pt-3 dark:border-blue-900">
              <Link
                href="/reasoning"
                className="text-xs font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                View Pathfinder reasoning &rarr;
              </Link>
              <span className="text-xs text-zinc-400 hover:text-zinc-600 cursor-pointer dark:hover:text-zinc-300">
                Override and choose manually
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
