"use client";

import { Patient } from "@/lib/types";
import {
  FileText, Stethoscope, AlertTriangle, Pill, Activity,
  Clock, ArrowRight, MoreHorizontal,
} from "lucide-react";
import Badge from "./ui/badge";

const sidebarSections: [string, string, React.ComponentType<{ size?: number; strokeWidth?: number }>][] = [
  ["summary", "Summary", FileText],
  ["encounter", "Encounter", Stethoscope],
  ["problems", "Problem list", AlertTriangle],
  ["meds", "Medications", Pill],
  ["labs", "Labs", Activity],
  ["imaging", "Imaging", FileText],
  ["history", "History", Clock],
  ["referrals", "Referrals", ArrowRight],
];

export function EmrSidebar({ active = "encounter" }: { active?: string }) {
  return (
    <aside
      style={{
        width: "var(--nav-side-width)",
        background: "var(--surface-sunken)",
        borderRight: "1px solid var(--border-default)",
        padding: "12px 8px",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        flexShrink: 0,
        overflow: "auto",
      }}
    >
      <div className="op-eyebrow" style={{ padding: "10px 8px 6px" }}>
        Chart
      </div>
      {sidebarSections.map(([id, label, Icon]) => {
        const isActive = id === active;
        return (
          <button
            key={id}
            className="op-focus"
            style={{
              height: 32,
              padding: "0 8px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              borderRadius: "var(--radius-card)",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              background: isActive ? "var(--surface-raised)" : "transparent",
              color: isActive ? "var(--ink-primary)" : "var(--ink-secondary)",
              font: `${isActive ? 500 : 400} 13px/18px var(--font-sans)`,
              boxShadow: isActive ? "0 0 0 1px var(--border-default)" : "none",
            }}
          >
            <Icon size={15} strokeWidth={1.75} />
            <span>{label}</span>
          </button>
        );
      })}

      <div className="op-eyebrow" style={{ padding: "20px 8px 6px" }}>
        This visit
      </div>
      <div style={{ padding: 8, display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", justifyContent: "space-between", font: "400 12px/16px var(--font-sans)", color: "var(--ink-muted)" }}>
          <span>Reason</span>
          <span style={{ color: "var(--ink-primary)" }}>Shoulder pain</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", font: "400 12px/16px var(--font-sans)", color: "var(--ink-muted)" }}>
          <span>Provider</span>
          <span style={{ color: "var(--ink-primary)" }}>S. Reyes, MD</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", font: "400 12px/16px var(--font-mono)", color: "var(--ink-muted)" }}>
          <span>Date</span>
          <span className="op-num" style={{ color: "var(--ink-primary)" }}>Apr 23, 2026</span>
        </div>
      </div>
    </aside>
  );
}

export function PatientBanner({ patient }: { patient: Patient }) {
  const initials = patient.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const items: [string, string, boolean][] = [
    ["MRN", `00${patient.id.replace("pat-", "")}`, true],
    ["DOB", `Mar 14, 1973 · ${patient.age}y`, true],
    ["Sex", "Male", false],
    ["Insurance", patient.insurance.split("(")[0].trim(), false],
    ["PCP", "Reyes, S.", false],
    ["Allergies", "NKDA", false],
  ];

  return (
    <div
      style={{
        background: "var(--surface-raised)",
        borderBottom: "1px solid var(--border-default)",
        padding: "12px 24px",
        display: "flex",
        alignItems: "center",
        gap: 24,
        flexShrink: 0,
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 8,
          background: "var(--surface-hover)",
          color: "var(--ink-secondary)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          font: "600 14px/1 var(--font-sans)",
          flexShrink: 0,
        }}
      >
        {initials}
      </div>

      {/* Name + status */}
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span
            style={{
              font: "600 17px/22px var(--font-sans)",
              color: "var(--ink-primary)",
              letterSpacing: "-0.005em",
            }}
          >
            {patient.name.split(" ").reverse().join(", ")}
          </span>
          <Badge tone="neutral">Active</Badge>
        </div>
        <div style={{ font: "400 12px/16px var(--font-sans)", color: "var(--ink-muted)" }}>
          Established patient · PCP relationship {patient.pcpRelationshipYears} years
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 36, width: 1, background: "var(--border-default)", margin: "0 4px" }} />

      {/* Identity fields */}
      <div style={{ display: "flex", alignItems: "center", gap: 28, flex: 1, flexWrap: "wrap" }}>
        {items.map(([label, value, mono]) => (
          <div key={label} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span className="op-eyebrow">{label}</span>
            <span
              className={mono ? "op-num" : ""}
              style={{
                font: mono
                  ? "500 13px/18px var(--font-mono)"
                  : "500 13px/18px var(--font-sans)",
                color: "var(--ink-primary)",
              }}
            >
              {value}
            </span>
          </div>
        ))}
      </div>

      {/* More button */}
      <button
        className="op-focus"
        style={{
          width: 28,
          height: 28,
          borderRadius: 6,
          border: "1px solid var(--border-default)",
          background: "var(--surface-raised)",
          color: "var(--ink-secondary)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <MoreHorizontal size={14} strokeWidth={1.75} />
      </button>
    </div>
  );
}
