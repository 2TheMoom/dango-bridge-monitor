"use client";

import { MessageWithMeta } from "@/hooks/useMessages";
import { CONNECTED_CHAINS } from "@/lib/dango";

interface Props {
  messages: MessageWithMeta[];
}

interface RouteStats {
  id: number;
  name: string;
  short: string;
  color: string;
  inbound: number;
  outbound: number;
  total: number;
}

export default function ChainMap({ messages }: Props) {
  const stats: RouteStats[] = CONNECTED_CHAINS.map((chain) => {
    const inbound = messages.filter(
      (m) => m.destinationChainId === chain.id
    ).length;
    const outbound = messages.filter(
      (m) => m.originChainId === chain.id
    ).length;
    return {
      id: chain.id,
      name: chain.name,
      short: chain.short,
      color: chain.color,
      inbound,
      outbound,
      total: inbound + outbound,
    };
  }).sort((a, b) => b.total - a.total);

  const maxTotal = Math.max(...stats.map((s) => s.total), 1);

  return (
    <div className="border border-border bg-card">
      <div className="px-5 py-3 border-b border-border bg-bg">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-charcoal">
          Chain Coverage
        </span>
      </div>

      <div className="divide-y divide-border">
        {stats.map((chain) => {
          const barWidth = maxTotal > 0
            ? Math.round((chain.total / maxTotal) * 100)
            : 0;

          return (
            <div key={chain.id} className="px-5 py-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ background: chain.color }}
                  />
                  <span className="font-mono text-[11px] font-semibold text-charcoal">
                    {chain.name}
                  </span>
                  <span className="font-mono text-[9px] text-muted uppercase tracking-wider">
                    {chain.short}
                  </span>
                </div>
                <span className="font-mono text-[11px] font-bold text-navy">
                  {chain.total} msgs
                </span>
              </div>

              <div className="h-1.5 bg-border rounded-full overflow-hidden mb-2">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${barWidth}%`, background: chain.color, opacity: 0.8 }}
                />
              </div>

              <div className="flex items-center gap-4">
                <span className="font-mono text-[9px] text-muted">
                  {"↓ "}
                  <span className="text-green font-semibold">{chain.inbound}</span>
                  {" inbound"}
                </span>
                <span className="font-mono text-[9px] text-muted">
                  {"↑ "}
                  <span className="text-navy font-semibold">{chain.outbound}</span>
                  {" outbound"}
                </span>
              </div>
            </div>
          );
        })}

        {stats.every((s) => s.total === 0) && (
          <div className="px-5 py-8 text-center font-mono text-[11px] text-muted">
            No chain activity in this window
          </div>
        )}
      </div>
    </div>
  );
}