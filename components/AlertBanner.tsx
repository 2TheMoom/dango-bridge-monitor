"use client";

import { RiskMetrics } from "@/hooks/useMessages";
import { RISK_THRESHOLDS } from "@/lib/dango";

interface Props { metrics: RiskMetrics; }

interface Alert {
  id: string;
  severity: "critical" | "warning";
  title: string;
  body: string;
}

export default function AlertBanner({ metrics }: Props) {
  const { failureRate, avgLatencySeconds, stuckMessages, hasAlert } = metrics;

  if (!hasAlert) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 20px", border: "1px solid #D4D0C8", background: "#F0EDE7" }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#1A6B3C", flexShrink: 0 }} />
        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1A6B3C" }}>All Systems Healthy</span>
        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, color: "#7A7670", marginLeft: "auto" }}>No alerts at this time</span>
      </div>
    );
  }

  const alerts: Alert[] = [];

  if (failureRate >= RISK_THRESHOLDS.failureRateCritical) {
    alerts.push({ id: "failure-critical", severity: "critical", title: "High Failure Rate", body: `Message failure rate is at ${failureRate}%, exceeding the critical threshold of ${RISK_THRESHOLDS.failureRateCritical}%. Immediate investigation required.` });
  } else if (failureRate >= RISK_THRESHOLDS.failureRateWarning) {
    alerts.push({ id: "failure-warning", severity: "warning", title: "Elevated Failure Rate", body: `Message failure rate is at ${failureRate}%, above the warning threshold of ${RISK_THRESHOLDS.failureRateWarning}%. Monitor closely.` });
  }

  if (avgLatencySeconds !== null && avgLatencySeconds >= RISK_THRESHOLDS.latencyCritical) {
    alerts.push({ id: "latency-critical", severity: "critical", title: "Critical Latency", body: `Average delivery latency is ${avgLatencySeconds}s, exceeding the critical threshold of ${RISK_THRESHOLDS.latencyCritical}s. Relayer may be degraded.` });
  } else if (avgLatencySeconds !== null && avgLatencySeconds >= RISK_THRESHOLDS.latencyWarning) {
    alerts.push({ id: "latency-warning", severity: "warning", title: "High Latency Detected", body: `Average delivery latency is ${avgLatencySeconds}s, above the warning threshold of ${RISK_THRESHOLDS.latencyWarning}s.` });
  }

  if (stuckMessages.length > 0) {
    alerts.push({ id: "stuck", severity: stuckMessages.length > 3 ? "critical" : "warning", title: `${stuckMessages.length} Stuck Message${stuckMessages.length > 1 ? "s" : ""}`, body: `${stuckMessages.length} message${stuckMessages.length > 1 ? "s have" : " has"} been pending for over ${RISK_THRESHOLDS.stuckMessageMs / 60000} minutes. Gas underfunding or relayer issues may be the cause.` });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {alerts.map((alert) => {
        const isCritical = alert.severity === "critical";
        return (
          <div key={alert.id} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 20px", border: `1px solid ${isCritical ? "rgba(176,28,46,0.3)" : "rgba(202,138,4,0.3)"}`, background: isCritical ? "rgba(176,28,46,0.05)" : "rgba(202,138,4,0.05)" }}>
            <span style={{ fontSize: 13, flexShrink: 0, marginTop: 1 }}>{isCritical ? "🚨" : "⚠️"}</span>
            <div>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: isCritical ? "#B01C2E" : "#b97900", marginBottom: 3 }}>{alert.title}</div>
              <div style={{ fontFamily: "Barlow, sans-serif", fontSize: 12, fontWeight: 300, color: "#161719", lineHeight: 1.6 }}>{alert.body}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}