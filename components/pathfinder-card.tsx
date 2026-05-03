"use client";

import { useState } from "react";
import Link from "next/link";
import { InferenceResult } from "@/lib/types";
import SpecialistRow from "./specialist-row";

export default function PathfinderCard({
  inference,
}: {
  inference: InferenceResult;
}) {
  const [scheduled, setScheduled] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const topSpecialists = inference.rankedSpecialists.slice(0, 3);
  const topSpecialist = topSpecialists[0];

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
        </div>
        <button
          onClick={() => setShowHowItWorks(!showHowItWorks)}
          className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
        >
          {showHowItWorks ? "Dismiss" : "How this works"}
        </button>
      </div>

      {/* How this works callout */}
      {showHowItWorks && (
        <div className="border-b border-blue-100 bg-blue-50 px-5 py-3 text-xs text-blue-800 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-300">
          Pathfinder reads the encounter note at the moment of referral order
          entry, infers the optimal sub-specialty, and ranks in-network
          specialists by clinical fit. This is a prototype with synthetic data.
        </div>
      )}

      <div className="space-y-4 px-5 py-4">
        {/* Scheduled confirmation */}
        {scheduled ? (
          <div className="rounded-md border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/30">
            <p className="text-sm font-medium text-green-800 dark:text-green-300">
              Appointment scheduled with {topSpecialist.name}
            </p>
            <p className="mt-1 text-xs text-green-600 dark:text-green-400">
              {topSpecialist.practiceName} &mdash;{" "}
              {topSpecialist.distanceMiles} miles &mdash; Next available in{" "}
              {topSpecialist.nextAvailableDays} days
            </p>
            <p className="mt-2 text-xs font-medium text-green-700 dark:text-green-300">
              Done
            </p>
          </div>
        ) : (
          <>
            {/* Recommendation */}
            <div>
              <p className="text-sm text-zinc-900 dark:text-zinc-100">
                Pathfinder recommends:{" "}
                <span className="font-semibold">
                  {inference.subSpecialty.split(" - ")[1] ?? inference.subSpecialty}
                </span>{" "}
                <span className="ml-1 text-xs font-medium text-blue-600 dark:text-blue-400">
                  {Math.round(inference.confidence * 100)}% confidence
                </span>
              </p>
              <p className="mt-1 text-xs text-zinc-500 leading-relaxed">
                {inference.rationale}
              </p>
            </div>

            {/* Ranked specialists */}
            <div className="space-y-2">
              {topSpecialists.map((specialist, i) => (
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

        {/* Action links */}
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
      </div>
    </div>
  );
}
