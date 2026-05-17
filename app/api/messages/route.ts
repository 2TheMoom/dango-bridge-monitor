import { NextRequest, NextResponse } from "next/server";
import { fetchMessages, computeLatency, routeLabel } from "@/lib/hyperlane";
import { isDangoMessage } from "@/lib/dango";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get("limit") ?? "30");

  try {
    // Fetch a larger pool then filter down to Dango-relevant messages
    const allMessages = await fetchMessages(100);

    const dangoMessages = allMessages.filter((m) =>
      isDangoMessage(m.originChainId, m.destinationChainId)
    );

    const enriched = dangoMessages
      .map((m) => ({
        ...m,
        latencySeconds: computeLatency(m),
        routeLabel: routeLabel(m.originChainId, m.destinationChainId),
      }))
      .slice(0, limit);

    return NextResponse.json(enriched);
  } catch (err) {
    console.error("API route error:", err);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}