import React from "react";

type Tone = "positive" | "signal" | "warning" | "negative" | "neutral" | "purple";

const toneStyles: Record<Tone, [string, string]> = {
  positive: ["rgba(22,163,74,0.10)", "#15803D"],
  signal: ["rgba(37,99,235,0.10)", "#1D4ED8"],
  warning: ["rgba(217,119,6,0.10)", "#B45309"],
  negative: ["rgba(220,38,38,0.10)", "#B91C1C"],
  neutral: ["var(--surface-hover)", "var(--ink-secondary)"],
  purple: ["rgba(124,58,237,0.10)", "#6D28D9"],
};

export default function Badge({
  tone = "neutral",
  mono = true,
  children,
  style,
}: {
  tone?: Tone;
  mono?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const [bg, fg] = toneStyles[tone];
  return (
    <span
      style={{
        background: bg,
        color: fg,
        padding: "2px 8px",
        borderRadius: "var(--radius-chip)",
        font: mono
          ? "500 11px/16px var(--font-mono)"
          : "500 11px/16px var(--font-sans)",
        letterSpacing: mono ? 0 : "0.02em",
        textTransform: "uppercase",
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {children}
    </span>
  );
}
