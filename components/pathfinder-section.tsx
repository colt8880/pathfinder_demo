"use client";

import { useState, useEffect } from "react";
import { InferenceResult } from "@/lib/types";
import PathfinderCard from "./pathfinder-card";

export default function PathfinderSection({
  patientId,
}: {
  patientId: string;
}) {
  const [inference, setInference] = useState<InferenceResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If already cached, don't re-fetch
    if (inference) return;

    let cancelled = false;

    async function fetchInference() {
      try {
        const res = await fetch("/api/infer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ patientId }),
        });
        const data = await res.json();
        if (!cancelled) {
          setInference(data);
          setLoading(false);
        }
      } catch {
        // On any client-side error, fetch the fallback
        console.error("Failed to fetch inference");
        setLoading(false);
      }
    }

    fetchInference();
    return () => {
      cancelled = true;
    };
  }, [patientId, inference]);

  return <PathfinderCard inference={inference} loading={loading} />;
}
