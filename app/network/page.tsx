import { referralEvents } from "@/lib/data/leakage";
import Card from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import NetworkTable from "@/components/network-table";
import { ArrowRight } from "lucide-react";

export default function NetworkView() {
  const total = referralEvents.length;
  const captured = referralEvents.filter((e) => e.outcome === "captured").length;
  const leaked = referralEvents.filter((e) => e.outcome === "leaked");
  const leakageRate = Math.round((leaked.length / total) * 100);
  const revenueAtRisk = leaked.reduce((sum, e) => sum + e.estimatedDownstreamValue, 0);

  // Find top leakage target
  const leakedToCount = new Map<string, { count: number; value: number; subSpecialty: string }>();
  for (const e of leaked) {
    if (e.leakedTo) {
      const cur = leakedToCount.get(e.leakedTo) ?? { count: 0, value: 0, subSpecialty: e.subSpecialty };
      cur.count++;
      cur.value += e.estimatedDownstreamValue;
      leakedToCount.set(e.leakedTo, cur);
    }
  }
  let topTarget = { name: "", count: 0, value: 0 };
  for (const [name, data] of leakedToCount) {
    if (data.count > topTarget.count) topTarget = { name, ...data };
  }

  const stats = [
    {
      eyebrow: "Referrals · 30d",
      value: total.toString(),
      delta: `${captured} captured`,
      deltaTone: "positive" as const,
      sub: "All specialties",
    },
    {
      eyebrow: "Leakage rate",
      value: `${leakageRate}%`,
      delta: "20pt above target",
      deltaTone: "negative" as const,
      sub: "Target: 10%",
    },
    {
      eyebrow: "Revenue at risk",
      value: `$${Math.round(revenueAtRisk / 1000)}K`,
      delta: `${leaked.length} leaked referrals`,
      deltaTone: "warning" as const,
      sub: "30 day trailing",
    },
  ];

  return (
    <div style={{ flex: 1, overflowY: "auto", background: "var(--surface-sunken)", padding: 24 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ font: "600 20px/28px var(--font-sans)", color: "var(--ink-primary)", margin: 0, letterSpacing: "-0.005em" }}>
              Network intelligence
            </h1>
            <p style={{ font: "400 14px/20px var(--font-sans)", color: "var(--ink-muted)", margin: "4px 0 0" }}>
              Last 30 days
            </p>
          </div>
          <Badge tone="neutral" mono={false}>
            Filter: All specialties
          </Badge>
        </div>

        {/* Stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {stats.map((s) => (
            <Card key={s.eyebrow} padding={16}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span className="op-eyebrow">{s.eyebrow}</span>
                <span
                  className="op-num"
                  style={{
                    font: "700 30px/36px var(--font-mono)",
                    color: "var(--ink-primary)",
                  }}
                >
                  {s.value}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Badge tone={s.deltaTone}>{s.delta}</Badge>
                </div>
                <span style={{ font: "400 12px/16px var(--font-sans)", color: "var(--ink-muted)" }}>
                  {s.sub}
                </span>
              </div>
            </Card>
          ))}
        </div>

        {/* Leaked referrals table */}
        <NetworkTable events={leaked} />

        {/* Recommended action */}
        <Card
          padding={20}
          style={{ borderColor: "var(--warning)", borderLeftWidth: 3 }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <span className="op-eyebrow">Recommended action</span>
            <p style={{ font: "400 14px/22px var(--font-sans)", color: "var(--ink-primary)", margin: 0 }}>
              <span className="op-num">{topTarget.count}</span> shoulder referrals leaked to{" "}
              {topTarget.name} in the last 30 days, totaling{" "}
              <span className="op-num">${Math.round(topTarget.value / 1000)}K</span> in lost downstream
              revenue. Consider hiring a fellowship-trained shoulder specialist or pursuing a partnership
              with the group.
            </p>
            <div>
              <Button variant="primary" size="md" icon={ArrowRight}>
                Reroute to Cedar Health
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
