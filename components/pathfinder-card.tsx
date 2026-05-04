"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Brain, Calendar, Check, X, AlertTriangle, ArrowRight,
} from "lucide-react";
import { InferenceResult, Specialist } from "@/lib/types";
import Badge from "./ui/badge";
import Button from "./ui/button";
import { useTour } from "./welcome-tour";
import Card from "./ui/card";
import ConfidenceMeter from "./ui/confidence-meter";

/* ---------- Slot picker ---------- */
const SLOTS = [
  { date: "Tue, Apr 28", time: "9:40 AM", room: "Summit · Suite 210" },
  { date: "Tue, Apr 28", time: "2:15 PM", room: "Summit · Suite 210" },
  { date: "Wed, Apr 29", time: "11:00 AM", room: "Summit · Suite 210" },
  { date: "Thu, Apr 30", time: "8:20 AM", room: "Telehealth" },
  { date: "Fri, May 1", time: "10:45 AM", room: "Summit · Suite 210" },
  { date: "Mon, May 4", time: "1:30 PM", room: "Telehealth" },
];

function SlotPicker({
  specialist,
  onClose,
  onConfirm,
}: {
  specialist: Specialist;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const [picked, setPicked] = useState(0);
  return (
    <div style={{ borderTop: "1px solid var(--border-default)", background: "var(--surface-sunken)" }}>
      <div
        style={{
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          borderBottom: "1px solid var(--border-divider)",
        }}
      >
        <Calendar size={14} strokeWidth={1.75} />
        <span style={{ font: "600 13px/18px var(--font-sans)", color: "var(--ink-primary)" }}>
          Available slots — {specialist.name}
        </span>
        <span className="op-num" style={{ font: "400 12px/16px var(--font-mono)", color: "var(--ink-muted)" }}>
          next 14 days · 6 of 23 shown
        </span>
        <div style={{ flex: 1 }} />
        <Button variant="ghost" size="sm" icon={X} onClick={onClose} />
      </div>
      <div style={{ padding: 16, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
        {SLOTS.map((s, i) => {
          const isPicked = picked === i;
          return (
            <button
              key={i}
              onClick={() => setPicked(i)}
              className="op-focus"
              style={{
                padding: "10px 12px",
                borderRadius: 6,
                cursor: "pointer",
                textAlign: "left",
                background: isPicked ? "var(--signal-primary-subtle)" : "var(--surface-raised)",
                border: isPicked ? "1px solid var(--signal-primary)" : "1px solid var(--border-default)",
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <span
                className="op-num"
                style={{
                  font: "500 13px/16px var(--font-mono)",
                  color: isPicked ? "var(--signal-primary)" : "var(--ink-primary)",
                }}
              >
                {s.date} · {s.time}
              </span>
              <span style={{ font: "400 11px/14px var(--font-sans)", color: "var(--ink-muted)" }}>
                {s.room}
              </span>
            </button>
          );
        })}
      </div>
      <div
        style={{
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          borderTop: "1px solid var(--border-divider)",
        }}
      >
        <span style={{ font: "400 12px/16px var(--font-sans)", color: "var(--ink-muted)" }}>
          Referral packet auto-attached: encounter note, MRI order, prior auth
        </span>
        <div style={{ flex: 1 }} />
        <Button variant="ghost" size="sm" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" size="sm" icon={Check} onClick={onConfirm}>
          Confirm referral
        </Button>
      </div>
    </div>
  );
}

/* ---------- Specialist row ---------- */
function SpecialistRow({
  specialist,
  selected,
  onSelect,
  onSchedule,
}: {
  specialist: Specialist;
  selected: boolean;
  onSelect: () => void;
  onSchedule: () => void;
}) {
  const fitPct = specialist.fitScore;
  const fitColor =
    fitPct >= 90 ? "var(--positive)" : fitPct >= 80 ? "var(--signal-primary)" : "var(--warning)";

  return (
    <div
      onClick={onSelect}
      style={{
        display: "grid",
        gridTemplateColumns: "44px 1fr 160px 110px",
        alignItems: "center",
        gap: 12,
        padding: "14px 20px",
        borderBottom: "1px solid var(--border-divider)",
        cursor: "pointer",
        background: selected ? "var(--signal-primary-subtle)" : "transparent",
        borderLeft: selected ? "2px solid var(--signal-primary)" : "2px solid transparent",
        transition: "background var(--duration-fast)",
      }}
    >
      {/* Fit */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
        <span
          className="op-num"
          style={{ font: "600 14px/16px var(--font-mono)", color: fitColor }}
        >
          {fitPct}
        </span>
        <span className="op-eyebrow">fit</span>
      </div>

      {/* Identity */}
      <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
          <span style={{ font: "500 14px/18px var(--font-sans)", color: "var(--ink-primary)" }}>
            {specialist.name}
          </span>
          <span style={{ font: "400 12px/16px var(--font-sans)", color: "var(--ink-muted)" }}>
            {specialist.subSpecialty}
          </span>
        </div>
        <div style={{ font: "400 12px/16px var(--font-sans)", color: "var(--ink-muted)" }}>
          {specialist.practiceName} ·{" "}
          <span className="op-num">{specialist.distanceMiles} mi</span>
        </div>
      </div>

      {/* Next slot */}
      <div style={{ display: "flex", flexDirection: "column", gap: 2, textAlign: "right" }}>
        <span
          className="op-num"
          style={{ font: "500 13px/16px var(--font-mono)", color: "var(--ink-primary)" }}
        >
          {specialist.nextAvailableDays} day lead
        </span>
        <span
          style={{
            font: "400 11px/14px var(--font-sans)",
            color: specialist.nextAvailableDays <= 5 ? "var(--positive)" : "var(--ink-muted)",
          }}
        >
          In-network
        </span>
      </div>

      {/* Action */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant={selected ? "primary" : "secondary"}
          size="sm"
          icon={Calendar}
          onClick={(e) => {
            e.stopPropagation();
            onSchedule();
          }}
        >
          Schedule
        </Button>
      </div>
    </div>
  );
}

/* ---------- Main card ---------- */
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
  const [selected, setSelected] = useState<string | null>(null);
  const [scheduling, setScheduling] = useState<string | null>(null);
  const { nudgeTarget, advanceNudge } = useTour();
  const reasoningPulse = nudgeTarget === "open-reasoning";
  const [confirmed, setConfirmed] = useState(false);

  const specialists = inference?.rankedSpecialists.slice(0, 3) ?? [];
  const schedulingSpec = specialists.find((s) => s.id === scheduling);

  // Set default selection when inference loads
  if (inference && !selected && specialists.length > 0) {
    setSelected(specialists[0].id);
  }

  /* ---- Confirmed state ---- */
  if (confirmed && inference) {
    const spec = specialists[0];
    return (
      <Card padding={0} style={{ overflow: "hidden", borderColor: "var(--positive)" }}>
        <div
          style={{
            padding: 20,
            display: "flex",
            gap: 16,
            alignItems: "center",
            background: "rgba(22,163,74,0.06)",
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              background: "var(--positive)",
              color: "#fff",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Check size={18} strokeWidth={2} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
            <span style={{ font: "600 15px/20px var(--font-sans)", color: "var(--ink-primary)" }}>
              Referral sent — {spec.name}
            </span>
            <span style={{ font: "400 12px/16px var(--font-sans)", color: "var(--ink-muted)" }}>
              Patient notified by SMS · Packet delivered to {spec.practiceName}
            </span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setConfirmed(false)}>
            Undo
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card padding={0} style={{ overflow: "hidden" }}>
      {/* ---- Idle state ---- */}
      {!loading && !inference && (
        <div style={{ padding: 20, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <p style={{ font: "400 14px/20px var(--font-sans)", color: "var(--ink-muted)" }}>
            Pathfinder can analyze this encounter note and recommend a sub-specialty referral.
          </p>
          <Button variant="primary" size="md" icon={Brain} onClick={onRun}>
            Run Pathfinder
          </Button>
        </div>
      )}

      {/* ---- Loading state ---- */}
      {loading && (
        <div style={{ padding: "20px", display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "var(--signal-primary)",
              color: "#fff",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Brain size={18} strokeWidth={1.75} style={{ animation: "spin 2s linear infinite" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span style={{ font: "500 13px/18px var(--font-sans)", color: "var(--ink-primary)" }}>
              {progressStep}
            </span>
            {source === null && (
              <span style={{ font: "400 12px/16px var(--font-sans)", color: "var(--ink-muted)" }}>
                Calling Claude Sonnet...
              </span>
            )}
          </div>
        </div>
      )}

      {/* ---- Loaded state ---- */}
      {!loading && inference && (
        <>
          {/* Inference header */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 16,
              padding: "16px 20px",
              background: "linear-gradient(180deg, rgba(37,99,235,0.04) 0%, rgba(37,99,235,0) 100%)",
              borderBottom: "1px solid var(--border-divider)",
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "var(--signal-primary)",
                color: "#fff",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Brain size={18} strokeWidth={1.75} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span className="op-eyebrow">Inferred sub-specialty</span>
                <Badge tone="signal" mono={false}>
                  Pathfinder
                </Badge>
                {source && (
                  <Badge tone={source === "live" ? "positive" : "neutral"}>
                    {source === "live" ? "Live AI" : "Mock"}
                  </Badge>
                )}
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
                <span
                  style={{
                    font: "600 20px/26px var(--font-sans)",
                    color: "var(--ink-primary)",
                    letterSpacing: "-0.005em",
                  }}
                >
                  {inference.subSpecialty.replace(" - ", " — ")}
                </span>
              </div>
            </div>
            <ConfidenceMeter value={inference.confidence} />
          </div>

          {/* Evidence */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexWrap: "wrap",
              padding: "12px 20px",
              borderBottom: "1px solid var(--border-divider)",
              background: "var(--surface-sunken)",
            }}
          >
            <span className="op-eyebrow" style={{ marginRight: 4 }}>
              Evidence
            </span>
            {inference.evidencePhrases.slice(0, 5).map((e) => (
              <span
                key={e}
                className="op-num"
                style={{
                  font: "400 12px/16px var(--font-mono)",
                  color: "var(--ink-secondary)",
                  background: "var(--surface-raised)",
                  border: "1px solid var(--border-default)",
                  padding: "3px 8px",
                  borderRadius: "var(--radius-chip)",
                }}
              >
                {e}
              </span>
            ))}
            <div style={{ flex: 1 }} />
            <Link
              href="/reasoning"
              className="op-focus"
              onClick={reasoningPulse ? advanceNudge : undefined}
              style={{
                font: "500 12px/16px var(--font-sans)",
                color: "var(--signal-primary)",
                background: reasoningPulse ? "var(--signal-primary-subtle)" : "transparent",
                border: "none",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                textDecoration: "none",
                padding: "4px 10px",
                borderRadius: "var(--radius-control)",
                animation: reasoningPulse ? "pulse-glow 2s ease-out infinite" : "none",
              }}
            >
              Open reasoning <ArrowRight size={12} strokeWidth={1.75} />
            </Link>
          </div>

          {/* Column headers */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "44px 1fr 160px 110px",
              alignItems: "center",
              gap: 12,
              padding: "8px 20px",
              borderBottom: "1px solid var(--border-default)",
              background: "var(--surface-sunken)",
            }}
          >
            <span className="op-eyebrow" style={{ textAlign: "center" }}>Fit</span>
            <span className="op-eyebrow">Specialist</span>
            <span className="op-eyebrow" style={{ textAlign: "right" }}>Next slot</span>
            <span className="op-eyebrow" style={{ textAlign: "right" }}>Action</span>
          </div>

          {/* Specialist rows */}
          {specialists.map((s) => (
            <SpecialistRow
              key={s.id}
              specialist={s}
              selected={selected === s.id}
              onSelect={() => setSelected(s.id)}
              onSchedule={() => setScheduling(s.id)}
            />
          ))}

          {/* Slot picker */}
          {scheduling && schedulingSpec && (
            <SlotPicker
              specialist={schedulingSpec}
              onClose={() => setScheduling(null)}
              onConfirm={() => {
                setConfirmed(true);
                setScheduling(null);
              }}
            />
          )}

          {/* Footer disclaimer */}
          <div
            style={{
              padding: "10px 20px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "var(--surface-sunken)",
            }}
          >
            <AlertTriangle size={13} strokeWidth={1.75} style={{ color: "var(--ink-muted)" }} />
            <span style={{ font: "400 12px/16px var(--font-sans)", color: "var(--ink-muted)" }}>
              Pathfinder ranks by clinical fit, access, and network. Final decision rests with the ordering provider.
            </span>
            <div style={{ flex: 1 }} />
            <button
              style={{
                font: "500 12px/16px var(--font-sans)",
                color: "var(--ink-secondary)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              Override sub-specialty
            </button>
          </div>
        </>
      )}
    </Card>
  );
}
