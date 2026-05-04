"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Stethoscope } from "lucide-react";
import Badge from "./ui/badge";
import { TourButton, useTour } from "./welcome-tour";

const tabs: [string, string][] = [
  ["/pcp", "PCP order entry"],
  ["/reasoning", "Clinical reasoning"],
  ["/network", "Network"],
];

export default function TopNav() {
  const pathname = usePathname();
  const { nudgeTarget, advanceNudge } = useTour();

  return (
    <header
      style={{
        height: "var(--nav-top-height)",
        background: "var(--surface-page)",
        borderBottom: "1px solid var(--border-default)",
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        gap: 16,
        flexShrink: 0,
      }}
    >
      {/* Brand */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: 6,
            background: "var(--ink-primary)",
            color: "var(--surface-page)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Stethoscope size={14} strokeWidth={1.75} />
        </div>
        <div style={{ font: "600 14px/18px var(--font-sans)", color: "var(--ink-primary)", letterSpacing: "-0.005em" }}>
          Pathfinder
        </div>
        <span style={{ color: "var(--ink-disabled)", font: "400 12px/16px var(--font-sans)" }}>·</span>
        <span style={{ color: "var(--ink-muted)", font: "400 12px/16px var(--font-sans)" }}>Qualified Health</span>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", alignItems: "center", gap: 2, marginLeft: 12 }}>
        {tabs.map(([href, label]) => {
          const isActive = pathname === href;
          const shouldPulse = nudgeTarget === "visit-network" && href === "/network";
          return (
            <Link
              key={href}
              href={href}
              className="op-focus"
              onClick={shouldPulse ? advanceNudge : undefined}
              style={{
                height: 32,
                padding: "0 12px",
                borderRadius: 6,
                background: shouldPulse ? "var(--signal-primary-subtle)" : "transparent",
                font: `${isActive ? 500 : 400} 13px/18px var(--font-sans)`,
                color: isActive ? "var(--ink-primary)" : "var(--ink-secondary)",
                boxShadow: isActive ? "inset 0 -2px 0 var(--signal-primary)" : "none",
                display: "inline-flex",
                alignItems: "center",
                textDecoration: "none",
                animation: shouldPulse ? "pulse-glow 2s ease-out infinite" : "none",
              }}
            >
              {label}
            </Link>
          );
        })}
      </div>

      <div style={{ flex: 1 }} />

      {/* Synthetic data warning */}
      <Badge tone="warning" mono={false} style={{ height: 22 }}>
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: 3,
            background: "var(--warning)",
            display: "inline-block",
            marginRight: 2,
          }}
        />
        Synthetic data demo
      </Badge>

      {/* Tour help button */}
      <TourButton />

      {/* Search */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          height: 28,
          padding: "0 8px",
          border: "1px solid var(--border-default)",
          borderRadius: 6,
          background: "var(--surface-sunken)",
          color: "var(--ink-muted)",
          font: "400 12px/16px var(--font-sans)",
        }}
      >
        <Search size={13} strokeWidth={1.75} />
        <span>Patient, MRN…</span>
      </div>

      {/* User chip */}
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: 6,
          background: "var(--surface-hover)",
          color: "var(--ink-secondary)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          font: "500 11px/1 var(--font-sans)",
        }}
      >
        CO
      </div>
    </header>
  );
}
