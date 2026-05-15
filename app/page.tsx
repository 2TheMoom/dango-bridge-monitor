"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const TICKER_ITEMS = [
  { label: "ETH → DANGO", value: "247 msgs", up: true },
  { label: "DANGO → ARB", value: "183 msgs", up: true },
  { label: "FAILURE RATE", value: "0.4%", up: true },
  { label: "AVG LATENCY", value: "14.2s", up: false },
  { label: "ISM VALIDATORS", value: "HEALTHY", up: true },
  { label: "PENDING MSGS", value: "12", up: false },
  { label: "BASE → DANGO", value: "91 msgs", up: true },
  { label: "LAST ALERT", value: "NONE", up: true },
];

const MOCK_ROWS = [
  { time: "09:41:22", route: "ETH→DNG", id: "0x3f2a...c18e", status: "delivered", latency: "11.4s", ok: true },
  { time: "09:41:08", route: "DNG→ARB", id: "0x88bc...04f1", status: "delivered", latency: "9.8s", ok: true },
  { time: "09:40:51", route: "BASE→DNG", id: "0xd17e...9a2b", status: "pending", latency: "18.2s", ok: false },
  { time: "09:40:33", route: "ETH→DNG", id: "0xa44c...771d", status: "delivered", latency: "12.1s", ok: true },
  { time: "09:39:14", route: "DNG→ETH", id: "0x5c90...38aa", status: "failed", latency: "—", ok: false },
  { time: "09:38:57", route: "ARB→DNG", id: "0x2b11...e6c3", status: "delivered", latency: "8.6s", ok: true },
  { time: "09:38:40", route: "ETH→DNG", id: "0x91fe...2d08", status: "delivered", latency: "13.0s", ok: true },
];

const RISK_ROWS = [
  { label: "ISM Validator Count (ETH→DNG)", value: "5 / 5 live", status: "green" },
  { label: "Message Failure Rate (24h)", value: "0.4%", status: "green" },
  { label: "Avg Delivery Latency", value: "18.2s", status: "yellow" },
  { label: "Pending Message Backlog", value: "12 msgs", status: "yellow" },
  { label: "Stuck Messages (over 15 min)", value: "2 flagged", status: "red" },
  { label: "Single-Validator Routes", value: "None", status: "green" },
  { label: "Relayer Liveness", value: "Healthy", status: "green" },
];

const STATUS_COLORS: Record<string, string> = {
  delivered: "text-[#1A6B3C] border-[#1A6B3C]",
  pending: "text-yellow-700 border-yellow-600",
  failed: "text-[#B01C2E] border-[#B01C2E]",
};

const DOT_COLORS: Record<string, string> = {
  delivered: "bg-[#1A6B3C]",
  pending: "bg-yellow-600",
  failed: "bg-[#B01C2E]",
};

const RISK_DOT: Record<string, string> = {
  green: "bg-[#1A6B3C]",
  yellow: "bg-yellow-500",
  red: "bg-[#B01C2E]",
};

const RISK_VAL: Record<string, string> = {
  green: "text-[#1A6B3C]",
  yellow: "text-yellow-700",
  red: "text-[#B01C2E]",
};

export default function Landing() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="min-h-screen" style={{ background: "#E9E6DF", color: "#161719", fontFamily: "Barlow, sans-serif" }}>

      <div style={{ background: "#1F3A8F", overflow: "hidden", padding: "8px 0" }}>
        <div
          style={{
            display: "flex",
            width: "max-content",
            animation: mounted ? "ticker 36s linear infinite" : "none",
          }}
        >
          {doubled.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 40px", fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "rgba(255,255,255,0.7)", whiteSpace: "nowrap" }}>
              <span>{item.label}</span>
              <span style={{ color: item.up ? "#5ddb96" : "#fff", fontWeight: 600 }}>{item.value}</span>
              <span style={{ color: "rgba(255,255,255,0.2)" }}>//</span>
            </div>
          ))}
        </div>
      </div>

      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 60px", borderBottom: "1px solid #D4D0C8", position: "sticky", top: 0, background: "#E9E6DF", zIndex: 100 }}>
        <div style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: 20, fontWeight: 800, letterSpacing: "0.04em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 10 }}>
          Bridge<span style={{ color: "#1F3A8F" }}>Monitor</span>
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", background: "#1F3A8F", color: "#fff", padding: "3px 7px" }}>Beta</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <a href="#features" style={{ fontSize: 13, fontWeight: 500, color: "#7A7670", textDecoration: "none" }}>Features</a>
          <a href="#risk" style={{ fontSize: 13, fontWeight: 500, color: "#7A7670", textDecoration: "none" }}>Risk Panel</a>
          <a href="#why" style={{ fontSize: 13, fontWeight: 500, color: "#7A7670", textDecoration: "none" }}>Why It Matters</a>
          <Link href="/dashboard" style={{ fontSize: 13, fontWeight: 500, color: "#7A7670", textDecoration: "none" }}>Dashboard</Link>
          <Link href="/dashboard" style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", background: "#1F3A8F", color: "#fff", padding: "9px 22px", textDecoration: "none" }}>Launch App →</Link>
        </div>
      </nav>

      <div style={{ padding: "80px 60px 60px", display: "grid", gridTemplateColumns: "1fr 480px", gap: 60, alignItems: "start", maxWidth: 1280, margin: "0 auto" }}>
        <div>
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#1F3A8F", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ display: "inline-block", width: 24, height: 2, background: "#1F3A8F" }} />
            Dango Bridge Risk Monitor
          </div>
          <h1 style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: 86, fontWeight: 900, lineHeight: 0.9, letterSpacing: "-0.01em", textTransform: "uppercase", marginBottom: 28 }}>
            <span style={{ color: "#161719", display: "block" }}>See Every</span>
            <span style={{ color: "#1F3A8F", display: "block" }}>Message.</span>
            <span style={{ color: "#B01C2E", display: "block" }}>Flag Every</span>
            <span style={{ color: "#161719", display: "block" }}>Risk.</span>
          </h1>
          <p style={{ fontSize: 16, fontWeight: 300, color: "#7A7670", lineHeight: 1.7, maxWidth: 460, marginBottom: 36 }}>
            Real-time visibility into Dango&apos;s{" "}
            <strong style={{ color: "#161719", fontWeight: 500 }}>Hyperlane bridge infrastructure</strong>.
            Monitor ISM validator health, message latency, and failure rates before they become a{" "}
            <strong style={{ color: "#161719", fontWeight: 500 }}>$292M problem</strong>.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 52 }}>
            <Link href="/dashboard" style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: 15, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", background: "#1F3A8F", color: "#fff", padding: "13px 28px", textDecoration: "none" }}>Launch Monitor →</Link>
            <a href="https://github.com/2TheMoom/dango-bridge-monitor" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, fontWeight: 500, color: "#7A7670", textDecoration: "none" }}>↗ View on GitHub</a>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", border: "1px solid #D4D0C8" }}>
            {[
              { label: "Messages Today", value: "1,247", sub: "↑ 12% from yesterday", color: "#1A6B3C" },
              { label: "Failure Rate", value: "0.4%", sub: "Well within threshold", color: "#1A6B3C" },
              { label: "Stuck Messages", value: "2", sub: "Over 15 min pending", color: "#B01C2E" },
              { label: "ISM Status", value: "OK", sub: "All validators live", color: "#1A6B3C" },
            ].map((stat, i) => (
              <div key={i} style={{ padding: "16px 20px", borderRight: i < 3 ? "1px solid #D4D0C8" : "none" }}>
                <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#7A7670", marginBottom: 6 }}>{stat.label}</div>
                <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 22, fontWeight: 700, color: stat.color, lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontSize: 10, color: "#7A7670", marginTop: 3 }}>{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#F0EDE7", border: "1px solid #D4D0C8", position: "relative", top: 8 }}>
          <div style={{ background: "#161719", padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: 6 }}>
              {["#f87171", "#fbbf24", "#34d399"].map((c, i) => (
                <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
              ))}
            </div>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "rgba(255,255,255,0.5)" }}>bridge_monitor — live feed</div>
            <div />
          </div>
          <div style={{ padding: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "80px 90px 1fr 80px 60px", gap: 8, padding: "6px 10px", background: "#E9E6DF", marginBottom: 2 }}>
              {["Time", "Route", "ID", "Status", "Latency"].map((h) => (
                <span key={h} style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#7A7670" }}>{h}</span>
              ))}
            </div>
            {MOCK_ROWS.map((row, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "80px 90px 1fr 80px 60px", gap: 8, padding: "7px 10px", borderBottom: "1px solid #D4D0C8", alignItems: "center" }}>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "#7A7670" }}>{row.time}</span>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, fontWeight: 600, color: "#1F3A8F" }}>{row.route}</span>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "#7A7670" }}>{row.id}</span>
                <span className={`font-mono text-[9px] font-semibold inline-flex items-center gap-1 border px-1.5 py-0.5 ${STATUS_COLORS[row.status] ?? "text-muted border-border"}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${DOT_COLORS[row.status] ?? "bg-muted"}`} />
                  {row.status}
                </span>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, fontWeight: 600, color: row.ok ? "#1A6B3C" : row.latency === "—" ? "#B01C2E" : "#b97900", textAlign: "right" }}>{row.latency}</span>
              </div>
            ))}
          </div>
          <div style={{ padding: "10px 16px", borderTop: "1px solid #D4D0C8", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "JetBrains Mono, monospace", fontSize: 9, fontWeight: 600, letterSpacing: "0.12em", color: "#1A6B3C", textTransform: "uppercase" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#1A6B3C" }} />
              Streaming live
            </div>
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "#1F3A8F" }}>▊</span>
          </div>
        </div>
      </div>

      <hr style={{ border: "none", borderTop: "1px solid #D4D0C8", margin: "0 60px" }} />

      <section id="features" style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 60px" }}>
        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#1F3A8F", marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ display: "inline-block", width: 16, height: 2, background: "#1F3A8F" }} />
          What it monitors
        </div>
        <h2 style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: 52, fontWeight: 800, lineHeight: 0.95, textTransform: "uppercase", color: "#161719", marginBottom: 16 }}>Four Panels.<br />Full Visibility.</h2>
        <p style={{ fontSize: 15, fontWeight: 300, color: "#7A7670", lineHeight: 1.65, maxWidth: 520, marginBottom: 52 }}>
          Everything Dango&apos;s bridge infrastructure exposes, surfaced in one place and updated every 30 seconds via the Hyperlane Explorer API.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", border: "1px solid #D4D0C8" }}>
          {[
            { num: "01", icon: "📡", title: "Live Message Feed", desc: "Every cross-chain message in and out of Dango with status, route, latency, and transaction hash. Filterable by chain and time window." },
            { num: "02", icon: "🔐", title: "ISM Health", desc: "Validator count, liveness status, and configuration per route. Flags any route running fewer than the recommended validator threshold." },
            { num: "03", icon: "🗺️", title: "Chain Coverage", desc: "All chains connected to Dango via Hyperlane, message volume per route, and which connected chains have highest activity." },
            { num: "04", icon: "🚨", title: "Alert Flags", desc: "Automatic alerts for stuck messages over 15 minutes, failed delivery spikes, underfunded gas, and single-validator route exposure." },
          ].map((f, i) => (
            <div key={i} style={{ padding: "32px 28px", borderRight: i < 3 ? "1px solid #D4D0C8" : "none", background: "#F0EDE7", position: "relative" }}>
              <div style={{ position: "absolute", top: 28, right: 28, fontFamily: "JetBrains Mono, monospace", fontSize: 11, fontWeight: 700, color: "#D4D0C8" }}>{f.num}</div>
              <div style={{ fontSize: 18, marginBottom: 20, width: 40, height: 40, border: "1px solid #D4D0C8", display: "flex", alignItems: "center", justifyContent: "center" }}>{f.icon}</div>
              <div style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: 22, fontWeight: 800, textTransform: "uppercase", color: "#161719", marginBottom: 10 }}>{f.title}</div>
              <p style={{ fontSize: 13, fontWeight: 300, color: "#7A7670", lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <hr style={{ border: "none", borderTop: "1px solid #D4D0C8", margin: "0 60px" }} />

      <div id="risk" style={{ background: "#F0EDE7", borderTop: "1px solid #D4D0C8", borderBottom: "1px solid #D4D0C8" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 60px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#1F3A8F", marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ display: "inline-block", width: 16, height: 2, background: "#1F3A8F" }} />
              Risk Panel
            </div>
            <h2 style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: 52, fontWeight: 800, lineHeight: 0.95, textTransform: "uppercase", color: "#161719", marginBottom: 16 }}>Know Your<br />Exposure.</h2>
            <p style={{ fontSize: 15, fontWeight: 300, color: "#7A7670", lineHeight: 1.65, maxWidth: 420, marginBottom: 32 }}>
              The risk panel surfaces the metrics that matter most for bridge security. Inspired directly by the KelpDAO exploit in April 2026, where a single misconfigured verifier cost $292M.
            </p>
            <div style={{ background: "rgba(176,28,46,0.05)", border: "1px solid rgba(176,28,46,0.2)", padding: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span>⚠️</span>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#B01C2E" }}>Example Alert: Underfunded Gas</span>
              </div>
              <p style={{ fontSize: 13, fontWeight: 300, color: "#161719", lineHeight: 1.6 }}>
                Message 0x3f2a...c18e on ETH → DANGO route has been pending for 18 minutes. Gas payment may be insufficient for relayer delivery.
              </p>
            </div>
          </div>
          <div style={{ border: "1px solid #D4D0C8" }}>
            {RISK_ROWS.map((row, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: i < RISK_ROWS.length - 1 ? "1px solid #D4D0C8" : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${RISK_DOT[row.status]}`} />
                  <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#161719" }}>{row.label}</span>
                </div>
                <span className={`font-mono text-[13px] font-bold ${RISK_VAL[row.status]}`}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section id="why" style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 60px", display: "grid", gridTemplateColumns: "260px 1fr", gap: 80, alignItems: "start" }}>
        <div style={{ position: "sticky", top: 80 }}>
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#B01C2E", marginBottom: 12 }}>April 18, 2026</div>
          <h2 style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: 38, fontWeight: 800, textTransform: "uppercase", lineHeight: 0.95, color: "#161719", marginBottom: 20 }}>
            Why <span style={{ color: "#B01C2E" }}>This</span><br />Exists.
          </h2>
          <p style={{ fontSize: 12, fontWeight: 300, color: "#7A7670", lineHeight: 1.65 }}>The KelpDAO exploit was not a smart contract bug. It was invisible infrastructure risk that nobody was watching.</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {[
            { border: "#B01C2E", label: "The Incident", text: "KelpDAO's rsETH bridge ran a 1-of-1 DVN setup using LayerZero's own verifier as the sole authority. Lazarus Group compromised the verifier's RPC nodes and DDoS'd the fallbacks simultaneously. With no second check, the bridge accepted a fabricated burn proof and released $292 million in rsETH." },
            { border: "#1F3A8F", label: "Why It's Relevant to Dango", text: "Dango chose Hyperlane precisely because its Interchain Security Modules give the team full control over verification logic. But that control is only an advantage if the configuration is visible. Bridge Monitor makes Dango's ISM configuration publicly auditable in real time." },
            { border: "#1A6B3C", label: "What This Tool Changes", text: "Bridge Monitor gives traders, researchers, and the Dango team a live, public view of bridge health. Every validator, every pending message, every latency spike. The goal is to make the infrastructure legible so the next KelpDAO story is caught in 15 minutes, not after $292M has moved." },
          ].map((block, i) => (
            <div key={i} style={{ borderLeft: `2px solid ${block.border}`, paddingLeft: 24 }}>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#7A7670", marginBottom: 8 }}>{block.label}</div>
              <p style={{ fontSize: 15, fontWeight: 300, color: "#161719", lineHeight: 1.7 }}>{block.text}</p>
            </div>
          ))}
        </div>
      </section>

      <hr style={{ border: "none", borderTop: "1px solid #D4D0C8", margin: "0 60px" }} />

      <div style={{ background: "#1F3A8F", padding: "80px 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontFamily: "Barlow Condensed, sans-serif", fontSize: 240, fontWeight: 900, color: "rgba(255,255,255,0.03)", whiteSpace: "nowrap", pointerEvents: "none" }}>MONITOR</div>
        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 20 }}>Open Source · Built for Dango</div>
        <h2 style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: 64, fontWeight: 900, textTransform: "uppercase", color: "#fff", lineHeight: 0.95, marginBottom: 20 }}>Watch the Bridge.<br />Not the Aftermath.</h2>
        <p style={{ fontSize: 15, fontWeight: 300, color: "rgba(255,255,255,0.55)", marginBottom: 36, maxWidth: 420, marginLeft: "auto", marginRight: "auto", lineHeight: 1.65 }}>
          Free, open source, and updated every 30 seconds. Built on the Hyperlane Explorer API and Dango&apos;s TypeScript SDK.
        </p>
        <Link href="/dashboard" style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: 15, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", background: "#fff", color: "#1F3A8F", padding: "13px 32px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>Launch Monitor →</Link>
      </div>

      <footer style={{ background: "#161719", padding: "40px 60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: 16, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>
          Bridge<span style={{ color: "#fff" }}>Monitor</span>
        </div>
        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "rgba(255,255,255,0.25)" }}>// Built on dango.exchange · Powered by Hyperlane</div>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <a href="https://github.com/2TheMoom/dango-bridge-monitor" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>↗ GitHub</a>
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "rgba(255,255,255,0.35)" }}>
            {"Built by "}
            <a href="https://x.com/olumi441" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.25)" }}>Abu Olumi</a>
          </span>
        </div>
      </footer>

      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

    </div>
  );
}