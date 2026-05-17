"use client";

interface MessageWithMeta {
  id: string;
  status: string;
  routeLabel: string;
  latencySeconds: number | null;
  originTransaction: { timestamp: number };
}

interface Props {
  messages: MessageWithMeta[];
  isLoading: boolean;
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, { color: string; border: string; dot: string }> = {
    delivered: { color: "#1A6B3C", border: "1px solid #1A6B3C", dot: "#1A6B3C" },
    pending:   { color: "#b97900", border: "1px solid #ca8a04", dot: "#ca8a04" },
    failing:   { color: "#B01C2E", border: "1px solid #B01C2E", dot: "#B01C2E" },
  };
  const s = styles[status] ?? { color: "#7A7670", border: "1px solid #D4D0C8", dot: "#7A7670" };
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        fontFamily: "JetBrains Mono, monospace",
        fontSize: 9,
        fontWeight: 600,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: s.color,
        border: s.border,
        padding: "3px 7px",
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: s.dot,
          flexShrink: 0,
        }}
      />
      {status}
    </span>
  );
}

function LatencyBadge({ seconds }: { seconds: number | null }) {
  if (seconds === null) {
    return (
      <span
        style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 10,
          color: "#7A7670",
        }}
      >
        n/a
      </span>
    );
  }
  const color =
    seconds < 20 ? "#1A6B3C" : seconds < 40 ? "#b97900" : "#B01C2E";
  return (
    <span
      style={{
        fontFamily: "JetBrains Mono, monospace",
        fontSize: 10,
        fontWeight: 600,
        color,
      }}
    >
      {seconds}s
    </span>
  );
}

function shortHash(hash: string) {
  return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
}

function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

function MsgRow({ msg }: { msg: MessageWithMeta }) {
  const url = `https://explorer.hyperlane.xyz/message/${msg.id}`;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "80px 100px 1fr 110px 70px",
        gap: 12,
        padding: "10px 20px",
        borderBottom: "1px solid #D4D0C8",
        alignItems: "center",
        background: "transparent",
        transition: "background 0.15s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#E9E6DF")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <span
        style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 10,
          color: "#7A7670",
        }}
      >
        {formatTime(msg.originTransaction.timestamp)}
      </span>
      <span
        style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 10,
          fontWeight: 600,
          color: "#1F3A8F",
        }}
      >
        {msg.routeLabel}
      </span>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 10,
          color: "#7A7670",
          textDecoration: "none",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) =>
          ((e.target as HTMLElement).style.color = "#1F3A8F")
        }
        onMouseLeave={(e) =>
          ((e.target as HTMLElement).style.color = "#7A7670")
        }
      >
        {shortHash(msg.id)}
      </a>
      <StatusBadge status={msg.status} />
      <LatencyBadge seconds={msg.latencySeconds} />
    </div>
  );
}

function EmptyState() {
  return (
    <div
      style={{
        padding: "40px 24px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          border: "1px solid #D4D0C8",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          marginBottom: 4,
        }}
      >
        🌉
      </div>
      <div
        style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#161719",
        }}
      >
        No bridge activity right now
      </div>
      <div
        style={{
          fontFamily: "Barlow, sans-serif",
          fontSize: 13,
          fontWeight: 300,
          color: "#7A7670",
          lineHeight: 1.65,
          maxWidth: 420,
        }}
      >
        The ETH → Dango USDC bridge is quiet at the moment. Messages will
        appear here as soon as a deposit is initiated from Ethereum mainnet.
      </div>
      <a
        href="https://dango.exchange"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 10,
          fontWeight: 600,
          color: "#1F3A8F",
          textDecoration: "none",
          border: "1px solid #1F3A8F",
          padding: "8px 16px",
          marginTop: 4,
          letterSpacing: "0.06em",
        }}
      >
        ↗ Go to dango.exchange to deposit USDC
      </a>
    </div>
  );
}

export default function MessageFeed({ messages, isLoading }: Props) {
  return (
    <div style={{ border: "1px solid #D4D0C8", background: "#F0EDE7" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 20px",
          borderBottom: "1px solid #D4D0C8",
          background: "#E9E6DF",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#1A6B3C",
              animation: "pulse 1.5s infinite",
            }}
          />
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#161719",
            }}
          >
            ETH → Dango USDC Deposits
          </span>
        </div>
        <span
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 9,
            color: "#7A7670",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Refreshes every 30s
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "80px 100px 1fr 110px 70px",
          gap: 12,
          padding: "8px 20px",
          borderBottom: "1px solid #D4D0C8",
          background: "#E9E6DF",
        }}
      >
        {["Time", "Route", "Message ID", "Status", "Latency"].map((h) => (
          <span
            key={h}
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#7A7670",
            }}
          >
            {h}
          </span>
        ))}
      </div>

      <div>
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "80px 100px 1fr 110px 70px",
                gap: 12,
                padding: "10px 20px",
                borderBottom: "1px solid #D4D0C8",
              }}
            >
              {Array.from({ length: 5 }).map((_, j) => (
                <div
                  key={j}
                  style={{
                    height: 12,
                    background: "#D4D0C8",
                    borderRadius: 2,
                    animation: "pulse 1.5s infinite",
                  }}
                />
              ))}
            </div>
          ))
        ) : messages.length === 0 ? (
          <EmptyState />
        ) : (
          messages.map((msg) => <MsgRow key={msg.id} msg={msg} />)
        )}
      </div>
    </div>
  );
}