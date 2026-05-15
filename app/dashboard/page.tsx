"use client";

import { useMessages, useRiskMetrics } from "@/hooks/useMessages";
import MessageFeed from "@/components/MessageFeed";
import RiskPanel from "@/components/RiskPanel";
import ChainMap from "@/components/ChainMap";
import AlertBanner from "@/components/AlertBanner";

export default function Dashboard() {
  const { messages, isLoading, isError } = useMessages(30);
  const metrics = useRiskMetrics(messages);

  const latencyColor =
    metrics.avgLatencySeconds !== null && metrics.avgLatencySeconds > 30
      ? "text-crimson"
      : "text-green";

  const failureColor = metrics.failureRate >= 2 ? "text-crimson" : "text-green";

  const stats = [
    {
      label: "Total Messages",
      value: String(metrics.totalMessages),
      sub: "In current window",
      color: "text-charcoal",
    },
    {
      label: "Delivered",
      value: String(metrics.deliveredCount),
      sub: "Successfully relayed",
      color: "text-green",
    },
    {
      label: "Failure Rate",
      value: `${metrics.failureRate}%`,
      sub: "Last 30 messages",
      color: failureColor,
    },
    {
      label: "Avg Latency",
      value: metrics.avgLatencySeconds !== null ? `${metrics.avgLatencySeconds}s` : "N/A",
      sub: "Origin to destination",
      color: latencyColor,
    },
  ];

  return (
    <div className="min-h-screen bg-bg">
      <div className="border-b border-border bg-card px-8 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <span className="font-condensed text-xl font-black uppercase tracking-wide text-charcoal">
            Bridge<span className="text-navy">Monitor</span>
          </span>
          <span className="font-mono text-[9px] font-semibold uppercase tracking-widest bg-navy text-white px-2 py-0.5">
            Beta
          </span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
            <span className="font-mono text-[10px] text-muted uppercase tracking-wider">
              Live
            </span>
          </div>
          <span className="font-mono text-[10px] text-muted">
            {messages.length} messages loaded
          </span>
        </div>
      </div>

      <div className="px-8 pt-5">
        <AlertBanner metrics={metrics} />
      </div>

      <div className="px-8 pt-4">
        <div className="grid grid-cols-4 border border-border">
          {stats.map((stat, i) => (
            <div key={i} className="px-6 py-4 border-r border-border last:border-r-0">
              <div className="font-mono text-[9px] font-semibold uppercase tracking-widest text-muted mb-1">
                {stat.label}
              </div>
              <div className={`font-mono text-2xl font-bold ${stat.color}`}>
                {isLoading ? (
                  <div className="h-7 w-16 bg-border rounded animate-pulse" />
                ) : (
                  stat.value
                )}
              </div>
              <div className="font-mono text-[9px] text-muted mt-1">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-8 pt-4 pb-8 grid grid-cols-3 gap-4">
        <div className="col-span-2">
          {isError ? (
            <div className="border border-crimson bg-crimson/5 px-5 py-8 text-center">
              <span className="font-mono text-[11px] text-crimson">
                Failed to load messages. Check your connection or the Hyperlane API.
              </span>
            </div>
          ) : (
            <MessageFeed messages={messages} isLoading={isLoading} />
          )}
        </div>
        <div className="flex flex-col gap-4">
          <RiskPanel metrics={metrics} />
          <ChainMap messages={messages} />
        </div>
      </div>

      <div className="border-t border-border px-8 py-4 flex items-center justify-between bg-card">
        <span className="font-mono text-[10px] text-muted">
          Built on dango.exchange · Powered by Hyperlane
        </span>
        <span className="font-mono text-[10px] text-muted">
          {"Built by "}
          <a href="https://x.com/olumi441" target="_blank" rel="noopener noreferrer" className="text-navy hover:text-charcoal transition-colors border-b border-navy/30">{"Abu Olumi"}</a>
        </span>
      </div>
    </div>
  );
}