"use client";

import { DANGO_CHAINS } from "@/lib/dango";

interface MessageWithMeta {
  originChainId: number;
  destinationChainId: number;
}

interface Props {
  messages: MessageWithMeta[];
}

export default function ChainMap({ messages }: Props) {
  const stats = DANGO_CHAINS.map((chain) => {
    const inbound = messages.filter((m) => m.destinationChainId === chain.id).length;
    const outbound = messages.filter((m) => m.originChainId === chain.id).length;
    return { ...chain, inbound, outbound, total: inbound + outbound };
  }).sort((a, b) => b.total - a.total);

  const maxTotal = Math.max(...stats.map((s) => s.total), 1);

  return (
    <div style={{ border: "1px solid #D4D0C8", background: "#F0EDE7" }}>
      <div style={{ padding: "12px 20px", borderBottom: "1px solid #D4D0C8", background: "#E9E6DF" }}>
        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#161719" }}>Dango Route Activity</div>
        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, color: "#7A7670", marginTop: 2 }}>ETH → Dango · USDC deposits only</div>
      </div>
      <div>
        {stats.map((chain, i) => {
          const barWidth = Math.round((chain.total / maxTotal) * 100);
          return (
            <div key={chain.id} style={{ padding: "12px 20px", borderBottom: i < stats.length - 1 ? "1px solid #D4D0C8" : "none" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: chain.color, flexShrink: 0 }} />
                  <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, fontWeight: 600, color: "#161719" }}>{chain.name}</span>
                  <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, color: "#7A7670" }}>{chain.short}</span>
                </div>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, fontWeight: 700, color: "#1F3A8F" }}>{chain.total} msgs</span>
              </div>
              <div style={{ height: 4, background: "#D4D0C8", overflow: "hidden", marginBottom: 6 }}>
                <div style={{ height: "100%", width: `${barWidth}%`, background: chain.color, opacity: 0.85, transition: "width 0.5s ease" }} />
              </div>
              <div style={{ display: "flex", gap: 16 }}>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, color: "#7A7670" }}>
                  {"↓ "}<span style={{ color: "#1A6B3C", fontWeight: 600 }}>{chain.inbound}</span>{" inbound to Dango"}
                </span>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, color: "#7A7670" }}>
                  {"↑ "}<span style={{ color: "#1F3A8F", fontWeight: 600 }}>{chain.outbound}</span>{" outbound"}
                </span>
              </div>
            </div>
          );
        })}
        {stats.every((s) => s.total === 0) && (
          <div style={{ padding: "24px 20px" }}>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "#7A7670", marginBottom: 6, textAlign: "center" }}>No Dango bridge activity in this window</div>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, color: "#D4D0C8", textAlign: "center" }}>Active route: ETH → Dango (USDC)</div>
          </div>
        )}
      </div>
    </div>
  );
}