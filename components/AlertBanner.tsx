"use client";

import { RiskMetrics } from "@/hooks/useMessages";
import { RISK_THRESHOLDS } from "@/lib/dango";

interface Props {
  metrics: RiskMetrics;
}

interface Alert {
  id: string;
  severity: "critical" | "warning";
  title: string;
  body: string;
}

export default function AlertBanner({ metrics }: Props) {
  const {
    failureRate,
    avgLatencySeconds,
    stuckMessages,
    hasAlert,
  } = metrics;

  if (!hasAlert) {
    return (
      <div className="flex items-center gap-3 px-5 py-3 border border-border bg-card">
        <span className="w-2 h-2 rounded-full bg-green animate-pulse flex-shrink-0" />
        <span className="font-mono text-[11px] text-green font-semibold uppercase tracking-wider">
          All Systems Healthy
        </span>
        <span className="font-mono text-[10px] text-muted ml-auto">
          No alerts at this time
        </span>
      </div>
    );
  }

  // Build alert list
  const alerts: Alert[] = [];

  if (failureRate >= RISK_THRESHOLDS.failureRateCritical) {
    alerts.push({
      id: "failure-critical",
      severity: "critical",
      title: "High Failure Rate",
      body: `Message failure rate is at ${failureRate}%, exceeding the critical threshold of ${RISK_THRESHOLDS.failureRateCritical}%. Immediate investigation required.`,
    });
  } else if (failureRate >= RISK_THRESHOLDS.failureRateWarning) {
    alerts.push({
      id: "failure-warning",
      severity: "warning",
      title: "Elevated Failure Rate",
      body: `Message failure rate is at ${failureRate}%, above the warning threshold of ${RISK_THRESHOLDS.failureRateWarning}%. Monitor closely.`,
    });
  }

  if (
    avgLatencySeconds !== null &&
    avgLatencySeconds >= RISK_THRESHOLDS.latencyCritical
  ) {
    alerts.push({
      id: "latency-critical",
      severity: "critical",
      title: "Critical Latency",
      body: `Average delivery latency is ${avgLatencySeconds}s, exceeding the critical threshold of ${RISK_THRESHOLDS.latencyCritical}s. Relayer may be degraded.`,
    });
  } else if (
    avgLatencySeconds !== null &&
    avgLatencySeconds >= RISK_THRESHOLDS.latencyWarning
  ) {
    alerts.push({
      id: "latency-warning",
      severity: "warning",
      title: "High Latency Detected",
      body: `Average delivery latency is ${avgLatencySeconds}s, above the warning threshold of ${RISK_THRESHOLDS.latencyWarning}s.`,
    });
  }

  if (stuckMessages.length > 0) {
    alerts.push({
      id: "stuck-messages",
      severity: stuckMessages.length > 3 ? "critical" : "warning",
      title: `${stuckMessages.length} Stuck Message${stuckMessages.length > 1 ? "s" : ""}`,
      body: `${stuckMessages.length} message${stuckMessages.length > 1 ? "s have" : " has"} been pending for over ${RISK_THRESHOLDS.stuckMessageMs / 60000} minutes. Gas underfunding or relayer issues may be the cause.`,
    });
  }

  return (
    <div className="flex flex-col gap-2">
      {alerts.map((alert) => {
        const isCritical = alert.severity === "critical";
        return (
          <div
            key={alert.id}
            className={`flex items-start gap-3 px-5 py-3 border ${
              isCritical
                ? "border-crimson bg-crimson/5"
                : "border-yellow-600 bg-yellow-50"
            }`}
          >
            <span className="text-base flex-shrink-0 mt-0.5">
              {isCritical ? "🚨" : "⚠️"}
            </span>
            <div className="flex flex-col gap-0.5">
              <span
                className={`font-mono text-[10px] font-bold uppercase tracking-wider ${
                  isCritical ? "text-crimson" : "text-yellow-700"
                }`}
              >
                {alert.title}
              </span>
              <span className="font-sans text-[12px] font-light text-charcoal leading-relaxed">
                {alert.body}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}