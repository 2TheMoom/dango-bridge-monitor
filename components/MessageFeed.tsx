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
  const styles: Record<string, string> = {
    delivered: "text-green border-green",
    pending: "text-yellow-700 border-yellow-600",
    failing: "text-crimson border-crimson",
  };
  const dots: Record<string, string> = {
    delivered: "bg-green",
    pending: "bg-yellow-600",
    failing: "bg-crimson",
  };
  const s = styles[status] ?? "text-muted border-border";
  const d = dots[status] ?? "bg-muted";
  return <span className={`inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider border px-2 py-0.5 ${s}`}><span className={`w-1.5 h-1.5 rounded-full animate-pulse ${d}`} />{status}</span>;
}

function LatencyBadge({ seconds }: { seconds: number | null }) {
  if (seconds === null) return <span className="font-mono text-[10px] text-muted">n/a</span>;
  const c = seconds < 20 ? "text-green" : seconds < 40 ? "text-yellow-700" : "text-crimson";
  return <span className={`font-mono text-[10px] font-semibold ${c}`}>{seconds}s</span>;
}

function shortHash(hash: string) {
  return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
}

function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
}

function MsgRow({ msg }: { msg: MessageWithMeta }) {
  const url = `https://explorer.hyperlane.xyz/message/${msg.id}`;
  return (
    <div className="grid grid-cols-5 gap-3 px-5 py-3 hover:bg-bg transition-colors items-center border-b border-border last:border-b-0">
      <span className="font-mono text-[10px] text-muted">{formatTime(msg.originTransaction.timestamp)}</span>
      <span className="font-mono text-[10px] font-semibold text-navy">{msg.routeLabel}</span>
      <a href={url} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] text-muted hover:text-navy truncate">{shortHash(msg.id)}</a>
      <StatusBadge status={msg.status} />
      <LatencyBadge seconds={msg.latencySeconds} />
    </div>
  );
}

export default function MessageFeed({ messages, isLoading }: Props) {
  return (
    <div className="border border-border bg-card">
      <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-bg">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
          <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-charcoal">Live Message Feed</span>
        </div>
        <span className="font-mono text-[9px] text-muted uppercase tracking-wider">Refreshes every 30s</span>
      </div>
      <div className="grid grid-cols-5 gap-3 px-5 py-2 border-b border-border bg-bg">
        {["Time", "Route", "Message ID", "Status", "Latency"].map((h) => (
          <span key={h} className="font-mono text-[9px] font-bold uppercase tracking-widest text-muted">{h}</span>
        ))}
      </div>
      <div>
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="grid grid-cols-5 gap-3 px-5 py-3 animate-pulse border-b border-border">
              {Array.from({ length: 5 }).map((_, j) => <div key={j} className="h-3 bg-border rounded" />)}
            </div>
          ))
        ) : messages.length === 0 ? (
          <div className="px-5 py-8 text-center font-mono text-[11px] text-muted">No messages found</div>
        ) : (
          messages.map((msg) => <MsgRow key={msg.id} msg={msg} />)
        )}
      </div>
    </div>
  );
}