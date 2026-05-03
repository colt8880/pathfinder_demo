"use client";

import { useState, useEffect, useCallback } from "react";
import { InferenceResult } from "@/lib/types";
import PathfinderCard from "./pathfinder-card";

const PROGRESS_STEPS = [
  "Reading encounter note...",
  "Extracting clinical signals...",
  "Inferring sub-specialty...",
  "Ranking in-network specialists...",
];

export default function PathfinderSection({
  patientId,
}: {
  patientId: string;
}) {
  const [inference, setInference] = useState<InferenceResult | null>(null);
  const [source, setSource] = useState<"live" | "mock" | null>(null);
  const [loading, setLoading] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  // Advance progress steps while loading
  useEffect(() => {
    if (!loading) return;
    setStepIndex(0);
    const interval = setInterval(() => {
      setStepIndex((prev) =>
        prev < PROGRESS_STEPS.length - 1 ? prev + 1 : prev
      );
    }, 800);
    return () => clearInterval(interval);
  }, [loading]);

  const runInference = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/infer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patientId }),
      });
      const data = await res.json();
      setSource(data.source ?? null);
      setInference(data);
    } catch {
      console.error("Failed to fetch inference");
    } finally {
      setLoading(false);
    }
  }, [patientId]);

  return (
    <PathfinderCard
      inference={inference}
      loading={loading}
      source={source}
      progressStep={PROGRESS_STEPS[stepIndex]}
      onRun={runInference}
    />
  );
}
