"use client";

import { RiskMetrics } from "@/hooks/useMessages";
import { RISK_THRESHOLDS, ISM_VALIDATORS } from "@/lib/dango";

interface Props {
  metrics: RiskMetrics;
}

function RiskRow({ label, value, status }: { label: string; value: string; status: "green" | "yellow" | "red" }) {
  const dot = { green: "#1A6B3C", yellow: "#ca8a04", red: "#B01C2E" }[status];
  const val = { green: "#1A6B3C", yellow: "#b97900", red: "#B01C2E" }[status];
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", borderBottom: "1px solid #D4D0C8" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: dot, flexShrink: 0 }} />
        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "#161719" }}>{label}</span>
      </div>
      <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, fontWeight: 700, color: val }}>{value}</span>
    </div>
  );
}

export default function RiskPanel({ metrics }: Props) {
  const { totalMessages, deliveredCount, pendingCount, failedCount, failureRate, avgLatencySeconds, stuckMessages } = metrics;

  const failureStatus = failureRate >= RISK_THRESHOLDS.failureRateCritical ? "red" : failureRate >= RISK_THRESHOLDS.failureRateWarning ? "yellow" : "green";
  const latencyStatus = avgLatencySeconds === null ? "green" : avgLatencySeconds >= RISK_THRESHOLDS.latencyCritical ? "red" : avgLatencySeconds >= RISK_THRESHOLDS.latencyWarning ? "yellow" : "green";
  const stuckStatus = stuckMessages.length > 3 ? "red" : stuckMessages.length > 0 ? "yellow" : "green";
  const ismIssues = Object.entries(ISM_VALIDATORS).filter(([, v]) => v.count < RISK_THRESHOLDS.minValidators);
  const ismStatus = ismIssues.length > 0 ? "red" : "green";

  return (
    <div style={{ border: "1px solid #D4D0C8", background: "#F0EDE7" }}>
      <div style={{ padding: "12px 20px", borderBottom: "1px solid #D4D0C8", background: "#E9E6DF" }}>
        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#161719" }}>Risk Panel</span>
      </div>
      <div>
        <RiskRow label="Total Messages" value={`${totalMessages}`} status="green" />
        <RiskRow label="Delivered" value={`${deliveredCount}`} status="green" />
        <RiskRow label="Pending" value={`${pendingCount}`} status={pendingCount > 10 ? "yellow" : "green"} />
        <RiskRow label="Failed" value={`${failedCount}`} status={failedCount > 0 ? "red" : "green"} />
        <RiskRow label="Failure Rate (24h)" value={`${failureRate}%`} status={failureStatus} />
        <RiskRow label="Avg Latency" value={avgLatencySeconds !== null ? `${avgLatencySeconds}s` : "N/A"} status={latencyStatus} />
        <RiskRow label="Stuck Messages" value={`${stuckMessages.length} flagged`} status={stuckStatus} />
        <div style={{ borderBottom: "none" }}>
          <RiskRow label="ISM Coverage" value={ismIssues.length === 0 ? "All routes OK" : `${ismIssues.length} at risk`} status={ismStatus} />
        </div>
      </div>
    </div>
  );
}