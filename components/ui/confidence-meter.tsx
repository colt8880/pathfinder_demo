export default function ConfidenceMeter({
  value,
  label = "Confidence",
}: {
  value: number;
  label?: string;
}) {
  const pct = Math.round(value * 100);
  const color =
    pct >= 80 ? "var(--positive)" : pct >= 60 ? "var(--signal-primary)" : "var(--warning)";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 140 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span className="op-eyebrow">{label}</span>
        <span
          className="op-num"
          style={{
            font: "600 13px/16px var(--font-mono)",
            color: "var(--ink-primary)",
          }}
        >
          {pct}%
        </span>
      </div>
      <div
        style={{
          height: 4,
          background: "var(--surface-hover)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 2 }} />
      </div>
    </div>
  );
}
