"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useMessages, useRiskMetrics } from "@/hooks/useMessages";
import MessageFeed from "@/components/MessageFeed";
import RiskPanel from "@/components/RiskPanel";
import ChainMap from "@/components/ChainMap";
import AlertBanner from "@/components/AlertBanner";

export default function Dashboard() {
  const { messages, isLoading, isError } = useMessages(30);
  const metrics = useRiskMetrics(messages);
  const [lastRefreshed, setLastRefreshed] = useState<string>("");

  useEffect(() => {
    const update = () => {
      setLastRefreshed(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, []);

  const latencyColor =
    metrics.avgLatencySeconds !== null && metrics.avgLatencySeconds > 30
      ? "#B01C2E"
      : "#1A6B3C";

  const failureColor = metrics.failureRate >= 2 ? "#B01C2E" : "#1A6B3C";

  const stats = [
    {
      label: "Total Messages",
      value: String(metrics.totalMessages),
      sub: "In current window",
      color: "#161719",
    },
    {
      label: "Delivered",
      value: String(metrics.deliveredCount),
      sub: "Successfully relayed",
      color: "#1A6B3C",
    },
    {
      label: "Failure Rate",
      value: `${metrics.failureRate}%`,
      sub: "Last 30 messages",
      color: failureColor,
    },
    {
      label: "Avg Latency",
      value:
        metrics.avgLatencySeconds !== null
          ? `${metrics.avgLatencySeconds}s`
          : "N/A",
      sub: "Origin to destination",
      color: latencyColor,
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#E9E6DF",
        color: "#161719",
        fontFamily: "Barlow, sans-serif",
      }}
    >
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @media (max-width: 768px) {
          .dash-nav { padding: 12px 20px !important; }
          .dash-stats { grid-template-columns: repeat(2, 1fr) !important; }
          .dash-grid { grid-template-columns: 1fr !important; padding: 12px 16px 32px !important; }
          .dash-padding { padding: 12px 16px 0 !important; }
          .dash-footer { padding: 14px 20px !important; flex-direction: column !important; gap: 8px !important; text-align: center !important; }
        }
        @media (max-width: 480px) {
          .dash-stats { grid-template-columns: 1fr 1fr !important; }
          .dash-brand { font-size: 14px !important; }
        }
      `}</style>

      {/* Nav */}
      <nav
        className="dash-nav"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 48px",
          borderBottom: "1px solid #D4D0C8",
          position: "sticky",
          top: 0,
          background: "#E9E6DF",
          zIndex: 100,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <div
              className="dash-brand"
              style={{
                fontFamily: "Barlow Condensed, sans-serif",
                fontSize: 18,
                fontWeight: 800,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: "#161719",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              Dango{" "}
              <span style={{ color: "#1F3A8F" }}>Bridge</span>
              <span
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 9,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  background: "#1F3A8F",
                  color: "#fff",
                  padding: "3px 7px",
                }}
              >
                Beta
              </span>
            </div>
          </Link>
          <Link
            href="/"
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 10,
              color: "#7A7670",
              textDecoration: "none",
              letterSpacing: "0.06em",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            ← Home
          </Link>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#1A6B3C",
                display: "inline-block",
                animation: "pulse 2s infinite",
              }}
            />
            <span
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 10,
                color: "#7A7670",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Live
            </span>
          </div>
          {lastRefreshed && (
            <span
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 10,
                color: "#7A7670",
              }}
            >
              Last updated {lastRefreshed}
            </span>
          )}
        </div>
      </nav>

      {/* Context banner */}
      <div
        className="dash-padding"
        style={{
          padding: "12px 48px 0",
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginTop: 12,
        }}
      >
        <div
          style={{
            background: "#F0EDE7",
            border: "1px solid #D4D0C8",
            padding: "10px 16px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            flex: 1,
          }}
        >
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#1F3A8F",
              flexShrink: 0,
            }}
          >
            Active Route
          </span>
          <span
            style={{
              width: 1,
              height: 14,
              background: "#D4D0C8",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 10,
              color: "#161719",
            }}
          >
            ETH → Dango
          </span>
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 9,
              color: "#7A7670",
            }}
          >
            USDC deposits only · Collateral locked on Ethereum, synthetic minted on Dango
          </span>
        </div>
        <a
          href="https://dango.exchange"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 10,
            color: "#1F3A8F",
            textDecoration: "none",
            border: "1px solid #1F3A8F",
            padding: "10px 14px",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          ↗ Deposit USDC
        </a>
      </div>

      {/* Alert banner */}
      <div className="dash-padding" style={{ padding: "12px 48px 0" }}>
        <AlertBanner metrics={metrics} />
      </div>

      {/* Stats strip */}
      <div className="dash-padding" style={{ padding: "12px 48px 0" }}>
        <div
          className="dash-stats"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            border: "1px solid #D4D0C8",
            background: "#F0EDE7",
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              style={{
                padding: "20px 24px",
                borderRight: i < 3 ? "1px solid #D4D0C8" : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 9,
                  fontWeight: 600,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#7A7670",
                  marginBottom: 8,
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 28,
                  fontWeight: 700,
                  color: stat.color,
                  lineHeight: 1,
                }}
              >
                {isLoading ? (
                  <div
                    style={{
                      height: 28,
                      width: 60,
                      background: "#D4D0C8",
                      borderRadius: 2,
                      animation: "pulse 1.5s infinite",
                    }}
                  />
                ) : (
                  stat.value
                )}
              </div>
              <div
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 9,
                  color: "#7A7670",
                  marginTop: 4,
                }}
              >
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main grid */}
      <div
        className="dash-grid"
        style={{
          padding: "16px 48px 48px",
          display: "grid",
          gridTemplateColumns: "1fr 340px",
          gap: 16,
        }}
      >
        <div>
          {isError ? (
            <div
              style={{
                border: "1px solid #B01C2E",
                background: "rgba(176,28,46,0.05)",
                padding: "32px 24px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 11,
                  color: "#B01C2E",
                  marginBottom: 8,
                }}
              >
                Failed to load messages
              </div>
              <div
                style={{
                  fontFamily: "Barlow, sans-serif",
                  fontSize: 13,
                  color: "#7A7670",
                  fontWeight: 300,
                }}
              >
                Check your connection or try refreshing the page.
              </div>
            </div>
          ) : (
            <MessageFeed messages={messages} isLoading={isLoading} />
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <RiskPanel metrics={metrics} />
          <ChainMap messages={messages} />

          {/* What am I looking at? */}
          <div
            style={{
              border: "1px solid #D4D0C8",
              background: "#F0EDE7",
              padding: 16,
            }}
          >
            <div
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#161719",
                marginBottom: 12,
                borderBottom: "1px solid #D4D0C8",
                paddingBottom: 10,
              }}
            >
              What am I looking at?
            </div>
            {[
              {
                label: "Message Feed",
                desc: "Every USDC deposit from Ethereum to Dango. Each row is one bridge transaction.",
              },
              {
                label: "Delivered",
                desc: "USDC successfully received on Dango. Your funds are available.",
              },
              {
                label: "Pending",
                desc: "Bridge in progress. Usually completes in 10–30 seconds.",
              },
              {
                label: "Stuck (over 15 min)",
                desc: "May have insufficient gas. Check Hyperlane explorer for details.",
              },
              {
                label: "ISM Coverage",
                desc: "Number of validators securing the bridge. More is safer.",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  marginBottom: 10,
                  paddingBottom: 10,
                  borderBottom:
                    i < 4 ? "1px solid #D4D0C8" : "none",
                }}
              >
                <div
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#1F3A8F",
                    marginBottom: 3,
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 300,
                    color: "#7A7670",
                    lineHeight: 1.55,
                  }}
                >
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="dash-footer"
        style={{
          borderTop: "1px solid #D4D0C8",
          padding: "16px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#F0EDE7",
        }}
      >
        <span
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 10,
            color: "#7A7670",
          }}
        >
          {"// Monitoring ETH → Dango USDC bridge · Powered by Hyperlane"}
        </span>
        <span
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 10,
            color: "#7A7670",
          }}
        >
          {"Built by "}
          <a
            href="https://x.com/olumi441"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#1F3A8F",
              textDecoration: "none",
              borderBottom: "1px solid rgba(31,58,143,0.3)",
            }}
          >
            Abu Olumi
          </a>
        </span>
      </div>
    </div>
  );
}