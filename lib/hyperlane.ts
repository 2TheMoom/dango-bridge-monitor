export type MessageStatus = "delivered" | "pending" | "failing";

export interface HyperlaneMessage {
  id: string;
  status: MessageStatus;
  sender: string;
  recipient: string;
  originChainId: number;
  destinationChainId: number;
  originDomainId: number;
  destinationDomainId: number;
  originTransaction: {
    transactionHash: string;
    timestamp: number;
    blockNumber: number;
  };
  destinationTransaction?: {
    transactionHash: string;
    timestamp: number;
    blockNumber: number;
  };
  totalGasAmount?: string;
  body: string;
}

const GRAPHQL_URL = "https://api.hyperlane.xyz/v1/graphql";

const MESSAGES_QUERY = `
  query GetMessages($limit: Int!) @cached(ttl: 5) {
    q0: message_view(
      limit: $limit
      order_by: { id: desc }
    ) {
      id
      msg_id
      nonce
      sender
      recipient
      is_delivered
      send_occurred_at
      delivery_occurred_at
      delivery_latency
      origin_chain_id
      origin_domain_id
      origin_tx_id
      origin_tx_hash
      origin_tx_sender
      destination_chain_id
      destination_domain_id
      destination_tx_id
      destination_tx_hash
      destination_tx_sender
    }
  }
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapGqlMessage(m: any): HyperlaneMessage {
  const sendTs = m.send_occurred_at
    ? new Date(m.send_occurred_at).getTime()
    : Date.now();
  const deliveryTs = m.delivery_occurred_at
    ? new Date(m.delivery_occurred_at).getTime()
    : undefined;

  const status: MessageStatus = m.is_delivered
    ? "delivered"
    : "pending";

  return {
    id: m.msg_id ?? m.id,
    status,
    sender: m.sender ?? "",
    recipient: m.recipient ?? "",
    originChainId: Number(m.origin_chain_id),
    destinationChainId: Number(m.destination_chain_id),
    originDomainId: Number(m.origin_domain_id),
    destinationDomainId: Number(m.destination_domain_id),
    totalGasAmount: undefined,
    body: "",
    originTransaction: {
      transactionHash: m.origin_tx_hash ?? "",
      timestamp: sendTs,
      blockNumber: 0,
    },
    ...(deliveryTs && {
      destinationTransaction: {
        transactionHash: m.destination_tx_hash ?? "",
        timestamp: deliveryTs,
        blockNumber: 0,
      },
    }),
  };
}

export async function fetchMessages(limit = 20): Promise<HyperlaneMessage[]> {
  try {
    const res = await fetch(GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: MESSAGES_QUERY,
        variables: { limit },
      }),
      next: { revalidate: 30 },
    });

    if (!res.ok) {
      console.warn(`GraphQL API returned ${res.status}`);
      return [];
    }

    const json = await res.json();

    if (json.errors) {
      console.warn("GraphQL errors:", JSON.stringify(json.errors));
      return [];
    }

    const messages = json?.data?.q0 ?? [];
    return messages.map(mapGqlMessage);
  } catch (err) {
    console.error("fetchMessages error:", err);
    return [];
  }
}

export function computeLatency(msg: HyperlaneMessage): number | null {
  if (!msg.destinationTransaction) return null;
  return Math.round(
    (msg.destinationTransaction.timestamp - msg.originTransaction.timestamp) /
      1000
  );
}

export function routeLabel(
  originChainId: number,
  destinationChainId: number
): string {
  const names: Record<number, string> = {
    1: "ETH",
    42161: "ARB",
    8453: "BASE",
    10: "OP",
    137: "POLY",
    1399904803: "DNG",
  };
  const from = names[originChainId] ?? `${originChainId}`;
  const to = names[destinationChainId] ?? `${destinationChainId}`;
  return `${from}→${to}`;
}