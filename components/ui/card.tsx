import React from "react";

export default function Card({
  title,
  meta,
  action,
  children,
  padding = 16,
  style,
  headerStyle,
}: {
  title?: React.ReactNode;
  meta?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  padding?: number;
  style?: React.CSSProperties;
  headerStyle?: React.CSSProperties;
}) {
  return (
    <section
      style={{
        background: "var(--surface-raised)",
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-card)",
        ...style,
      }}
    >
      {(title || meta || action) && (
        <header
          style={{
            padding: `${padding - 4}px ${padding}px`,
            borderBottom: "1px solid var(--border-divider)",
            display: "flex",
            alignItems: "center",
            gap: 12,
            ...headerStyle,
          }}
        >
          {title && (
            <div style={{ font: "600 13px/18px var(--font-sans)", color: "var(--ink-primary)" }}>
              {title}
            </div>
          )}
          {meta && (
            <div style={{ font: "400 12px/16px var(--font-mono)", color: "var(--ink-muted)" }}>
              {meta}
            </div>
          )}
          <div style={{ flex: 1 }} />
          {action}
        </header>
      )}
      <div style={{ padding }}>{children}</div>
    </section>
  );
}
