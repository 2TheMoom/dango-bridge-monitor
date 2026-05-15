import useSWR from "swr";
import { HyperlaneMessage, } from "@/lib/hyperlane";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export interface MessageWithMeta extends HyperlaneMessage {
  latencySeconds: number | null;
  routeLabel: string;
}

export interface RiskMetrics {
  totalMessages: number;
  deliveredCount: number;
  pendingCount: number;
  failedCount: number;
  failureRate: number;
  avgLatencySeconds: number | null;
  stuckMessages: MessageWithMeta[];
  hasAlert: boolean;
}

export function useMessages(limit = 20) {
  const { data, error, isLoading } = useSWR<MessageWithMeta[]>(
    `/api/messages?limit=${limit}`,
    fetcher,
    {
      refreshInterval: 30000, // poll every 30 seconds
      revalidateOnFocus: true,
    }
  );

  return {
    messages: data ?? [],
    isLoading,
    isError: !!error,
  };
}

export function useRiskMetrics(messages: MessageWithMeta[]): RiskMetrics {
  const totalMessages = messages.length;
  const deliveredCount = messages.filter((m) => m.status === "delivered").length;
  const pendingCount   = messages.filter((m) => m.status === "pending").length;
  const failedCount    = messages.filter((m) => m.status === "failing").length;

  const failureRate = totalMessages > 0
    ? Math.round((failedCount / totalMessages) * 100 * 10) / 10
    : 0;

  const latencies = messages
    .map((m) => m.latencySeconds)
    .filter((l): l is number => l !== null);

  const avgLatencySeconds = latencies.length > 0
    ? Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length)
    : null;

  const STUCK_THRESHOLD_MS = 15 * 60 * 1000;
  const now = Date.now();

  const stuckMessages = messages.filter((m) => {
    if (m.status !== "pending") return false;
    const age = now - m.originTransaction.timestamp;
    return age > STUCK_THRESHOLD_MS;
  });

  const hasAlert =
    failureRate >= 2 ||
    stuckMessages.length > 0 ||
    (avgLatencySeconds !== null && avgLatencySeconds > 30);

  return {
    totalMessages,
    deliveredCount,
    pendingCount,
    failedCount,
    failureRate,
    avgLatencySeconds,
    stuckMessages,
    hasAlert,
  };
}