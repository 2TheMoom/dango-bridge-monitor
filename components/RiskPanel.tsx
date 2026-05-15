"use client";

import { RiskMetrics } from "@/hooks/useMessages";
import { RISK_THRESHOLDS, ISM_VALIDATORS } from "@/lib/dango";

interface Props {
  metrics: RiskMetrics;
}

function RiskRow({
  label,
  value,
  status,
}: {
  label: string;
  status: "green" | "yellow" | "red";
  value: string;
}) {
  const dotColors = {
    green:  "bg-green",
    yellow: "bg-yellow-600",
    red:    "bg-crimson",
  };

  const valColors = {
    green:  "text-green",
    yellow: "text-yellow-700",
    red:    "text-crimson",
  };

  return (
    <div className="flex items-center justify-between px-5 py-3 border-b border-border last:border-b-0">
      <div className="flex items-center gap-2">
        <span
          className={`w-2 h-2 rounded-full flex-shrink-0 animate-pulse ${dotColors[status]}`}
        />
        <span className="font-mono text-[11px] text-charcoal">{label}</span>
      </div>
      <span className={`font-mono text-[12px] font-bold ${valColors[status]}`}>
        {value}
      </span>
    </div>
  );
}

export default function RiskPanel({ metrics }: Props) {
  const {
    totalMessages,
    deliveredCount,
    pendingCount,
    failedCount,
    failureRate,
    avgLatencySeconds,
    stuckMessages,
  } = metrics;

  const failureStatus =
    failureRate >= RISK_THRESHOLDS.failureRateCritical ? "red" :
    failureRate >= RISK_THRESHOLDS.failureRateWarning  ? "yellow" :
    "green";

  const latencyStatus =
    avgLatencySeconds === null                               ? "green" :
    avgLatencySeconds >= RISK_THRESHOLDS.latencyCritical     ? "red"   :
    avgLatencySeconds >= RISK_THRESHOLDS.latencyWarning      ? "yellow":
    "green";

  const stuckStatus =
    stuckMessages.length > 3 ? "red"    :
    stuckMessages.length > 0 ? "yellow" :
    "green";

  const ismIssues = Object.entries(ISM_VALIDATORS).filter(
    ([, v]) => v.count < RISK_THRESHOLDS.minValidators
  );
  const ismStatus = ismIssues.length > 0 ? "red" : "green";

  return (
    <div className="border border-border bg-card">
      <div className="px-5 py-3 border-b border-border bg-bg">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-charcoal">
          Risk Panel
        </span>
      </div>

      <div className="divide-y divide-border">
        <RiskRow
          label="Total Messages"
          value={`${totalMessages}`}
          status="green"
        />
        <RiskRow
          label="Delivered"
          value={`${deliveredCount}`}
          status="green"
        />
        <RiskRow
          label="Pending"
          value={`${pendingCount}`}
          status={pendingCount > 10 ? "yellow" : "green"}
        />
        <RiskRow
          label="Failed"
          value={`${failedCount}`}
          status={failedCount > 0 ? "red" : "green"}
        />
        <RiskRow
          label="Failure Rate (24h)"
          value={`${failureRate}%`}
          status={failureStatus}
        />
        <RiskRow
          label="Avg Delivery Latency"
          value={avgLatencySeconds !== null ? `${avgLatencySeconds}s` : "N/A"}
          status={latencyStatus}
        />
        <RiskRow
          label="Stuck Messages (over 15 min)"
          value={`${stuckMessages.length} flagged`}
          status={stuckStatus}
        />
        <RiskRow
          label="ISM Validator Coverage"
          value={ismIssues.length === 0 ? "All routes OK" : `${ismIssues.length} route(s) at risk`}
          status={ismStatus}
        />
      </div>
    </div>
  );
}