import React from "react";
import type { LucideIcon } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost" | "destructive";
type Size = "xs" | "sm" | "md" | "lg";

const heights: Record<Size, number> = { xs: 24, sm: 28, md: 32, lg: 36 };
const fontSizes: Record<Size, number> = { xs: 11, sm: 12, md: 13, lg: 14 };
const paddings: Record<Size, number> = { xs: 8, sm: 10, md: 12, lg: 14 };

const variantStyles: Record<Variant, React.CSSProperties> = {
  primary: {
    background: "var(--signal-primary)",
    color: "#fff",
    borderColor: "var(--signal-primary)",
  },
  secondary: {
    background: "var(--surface-raised)",
    color: "var(--ink-primary)",
    borderColor: "var(--border-strong)",
  },
  ghost: {
    background: "transparent",
    color: "var(--ink-primary)",
    borderColor: "transparent",
  },
  destructive: {
    background: "var(--negative)",
    color: "#fff",
    borderColor: "var(--negative)",
  },
};

export default function Button({
  variant = "secondary",
  size = "md",
  icon: Icon,
  iconRight: IconRight,
  children,
  style,
  ...rest
}: {
  variant?: Variant;
  size?: Size;
  icon?: LucideIcon;
  iconRight?: LucideIcon;
  children?: React.ReactNode;
  style?: React.CSSProperties;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "style">) {
  const h = heights[size];
  const fs = fontSizes[size];
  const px = paddings[size];
  const iconSize = fs + 2;

  return (
    <button
      className="op-focus"
      style={{
        height: h,
        padding: `0 ${px}px`,
        borderRadius: "var(--radius-control)",
        font: `500 ${fs}px/1 var(--font-sans)`,
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        cursor: "pointer",
        border: "1px solid transparent",
        transition: "background var(--duration-fast) var(--ease-standard), transform var(--duration-fast)",
        whiteSpace: "nowrap",
        ...variantStyles[variant],
        ...style,
      }}
      {...rest}
    >
      {Icon && <Icon size={iconSize} strokeWidth={1.75} />}
      {children}
      {IconRight && <IconRight size={iconSize} strokeWidth={1.75} />}
    </button>
  );
}
