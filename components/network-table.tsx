"use client";

import { useState } from "react";
import { ReferralEvent } from "@/lib/types";
import Card from "./ui/card";
import Badge from "./ui/badge";

type SortKey = "date" | "specialty" | "estimatedDownstreamValue";
type SortDir = "asc" | "desc";

const headerStyle: React.CSSProperties = {
  padding: "0 16px",
  height: 36,
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
};

export default function NetworkTable({ events }: { events: ReferralEvent[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  function handleSort(key: SortKey) {
    if (sortKey === key) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("desc"); }
  }

  const sorted = [...events].sort((a, b) => {
    let cmp = 0;
    if (sortKey === "date") cmp = a.date.localeCompare(b.date);
    else if (sortKey === "specialty") cmp = a.specialty.localeCompare(b.specialty);
    else cmp = a.estimatedDownstreamValue - b.estimatedDownstreamValue;
    return sortDir === "asc" ? cmp : -cmp;
  });

  const arrow = (key: SortKey) => (sortKey === key ? (sortDir === "asc" ? " \u25B2" : " \u25BC") : "");

  return (
    <Card title="Leaked referrals" padding={0} style={{ overflow: "hidden" }}>
      {/* Header row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "96px 72px 1.3fr 1.5fr 1fr 88px 80px",
          background: "var(--surface-sunken)",
          borderBottom: "1px solid var(--border-default)",
        }}
      >
        <div className="op-eyebrow" style={{ ...headerStyle, cursor: "pointer" }} onClick={() => handleSort("date")}>
          Date{arrow("date")}
        </div>
        <div className="op-eyebrow" style={headerStyle}>Patient</div>
        <div className="op-eyebrow" style={{ ...headerStyle, cursor: "pointer" }} onClick={() => handleSort("specialty")}>
          Specialty{arrow("specialty")}
        </div>
        <div className="op-eyebrow" style={headerStyle}>Routed to</div>
        <div className="op-eyebrow" style={headerStyle}>Sub-specialty</div>
        <div className="op-eyebrow" style={{ ...headerStyle, justifyContent: "flex-end", cursor: "pointer" }} onClick={() => handleSort("estimatedDownstreamValue")}>
          Loss ${arrow("estimatedDownstreamValue")}
        </div>
        <div className="op-eyebrow" style={{ ...headerStyle, justifyContent: "flex-end" }}>Status</div>
      </div>

      {/* Rows */}
      {sorted.map((e) => (
        <div
          key={e.id}
          style={{
            display: "grid",
            gridTemplateColumns: "96px 72px 1.3fr 1.5fr 1fr 88px 80px",
            height: 36,
            alignItems: "center",
            borderBottom: "1px solid var(--border-divider)",
            font: "400 13px/18px var(--font-sans)",
            color: "var(--ink-primary)",
            transition: "background var(--duration-fast)",
          }}
          onMouseEnter={(el) => { el.currentTarget.style.background = "var(--surface-hover)"; }}
          onMouseLeave={(el) => { el.currentTarget.style.background = "transparent"; }}
        >
          <span className="op-num" style={{ padding: "0 16px", font: "400 13px/18px var(--font-mono)" }}>
            {e.date}
          </span>
          <span className="op-num" style={{ padding: "0 16px", font: "400 13px/18px var(--font-mono)" }}>
            {e.patientIdRedacted}
          </span>
          <span style={{ padding: "0 16px" }}>{e.specialty}</span>
          <span style={{ padding: "0 16px", color: "var(--negative)" }}>{e.leakedTo}</span>
          <span style={{ padding: "0 16px", color: "var(--ink-muted)" }}>{e.subSpecialty}</span>
          <span
            className="op-num"
            style={{
              padding: "0 16px",
              textAlign: "right",
              font: "500 13px/18px var(--font-mono)",
              color: "var(--negative)",
            }}
          >
            ${e.estimatedDownstreamValue.toLocaleString()}
          </span>
          <div style={{ padding: "0 16px", display: "flex", justifyContent: "flex-end" }}>
            <Badge tone="negative">Leaked</Badge>
          </div>
        </div>
      ))}
    </Card>
  );
}
