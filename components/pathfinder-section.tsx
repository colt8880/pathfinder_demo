"use client";

import { useState, useEffect, useCallback, createContext, useContext } from "react";
import { InferenceResult } from "@/lib/types";
import PathfinderCard from "./pathfinder-card";
import Card from "./ui/card";
import Button from "./ui/button";
import { Brain } from "lucide-react";
import { useTour } from "./welcome-tour";

const PROGRESS_STEPS = [
  "Reading encounter note...",
  "Extracting clinical signals...",
  "Inferring sub-specialty...",
  "Ranking in-network specialists...",
];

type PathfinderState = {
  inference: InferenceResult | null;
  source: "live" | "mock" | null;
  loading: boolean;
  progressStep: string;
  runInference: () => void;
};

const PathfinderContext = createContext<PathfinderState | null>(null);

export function PathfinderProvider({
  patientId,
  children,
}: {
  patientId: string;
  children: React.ReactNode;
}) {
  const [inference, setInference] = useState<InferenceResult | null>(null);
  const [source, setSource] = useState<"live" | "mock" | null>(null);
  const [loading, setLoading] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setStepIndex((prev) =>
        prev < PROGRESS_STEPS.length - 1 ? prev + 1 : prev
      );
    }, 800);
    return () => clearInterval(interval);
  }, [loading]);

  const runInference = useCallback(async () => {
    setStepIndex(0);
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
    <PathfinderContext.Provider
      value={{ inference, source, loading, progressStep: PROGRESS_STEPS[stepIndex], runInference }}
    >
      {children}
    </PathfinderContext.Provider>
  );
}

/** Compact trigger card: shows "Run Pathfinder" button or loading state. */
export function PathfinderTrigger() {
  const ctx = useContext(PathfinderContext)!;
  const { nudge } = useTour();

  if (ctx.inference) {
    return (
      <Card padding={16} style={{ borderColor: "var(--signal-primary)", borderLeftWidth: 3 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: 6,
              background: "var(--signal-primary)",
              color: "#fff",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Brain size={14} strokeWidth={1.75} />
          </div>
          <div style={{ flex: 1 }}>
            <span style={{ font: "500 13px/18px var(--font-sans)", color: "var(--ink-primary)" }}>
              Pathfinder results ready
            </span>
            <span style={{ font: "400 12px/16px var(--font-sans)", color: "var(--ink-muted)", display: "block" }}>
              See ranked specialists below
            </span>
          </div>
        </div>
      </Card>
    );
  }

  if (ctx.loading) {
    return (
      <Card padding={16}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: 6,
              background: "var(--signal-primary)",
              color: "#fff",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Brain size={14} strokeWidth={1.75} style={{ animation: "spin 2s linear infinite" }} />
          </div>
          <span style={{ font: "500 13px/18px var(--font-sans)", color: "var(--ink-primary)" }}>
            {ctx.progressStep}
          </span>
        </div>
      </Card>
    );
  }

  const shouldPulse = nudge && !ctx.inference && !ctx.loading;

  return (
    <Card
      padding={16}
      style={shouldPulse ? {
        borderColor: "var(--signal-primary)",
        animation: "pulse-glow 2s ease-out infinite",
        borderRadius: "var(--radius-card)",
      } : undefined}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center", padding: "8px 0" }}>
        <p style={{ font: "400 13px/18px var(--font-sans)", color: "var(--ink-muted)", textAlign: "center" }}>
          Analyze encounter note and recommend a sub-specialty referral
        </p>
        <Button variant="primary" size="md" icon={Brain} onClick={ctx.runInference}>
          Run Pathfinder
        </Button>
      </div>
    </Card>
  );
}

/** Full-width results card: renders only when inference is loaded. */
export function PathfinderResults() {
  const ctx = useContext(PathfinderContext)!;
  if (!ctx.inference) return null;
  return (
    <PathfinderCard
      inference={ctx.inference}
      loading={false}
      source={ctx.source}
      onRun={ctx.runInference}
    />
  );
}

/** Legacy single-component version (not used on PCP anymore). */
export default function PathfinderSection({
  patientId,
}: {
  patientId: string;
}) {
  const [inference, setInference] = useState<InferenceResult | null>(null);
  const [source, setSource] = useState<"live" | "mock" | null>(null);
  const [loading, setLoading] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setStepIndex((prev) =>
        prev < PROGRESS_STEPS.length - 1 ? prev + 1 : prev
      );
    }, 800);
    return () => clearInterval(interval);
  }, [loading]);

  const runInference = useCallback(async () => {
    setStepIndex(0);
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
