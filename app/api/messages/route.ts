import { NextRequest, NextResponse } from "next/server";
import { fetchMessages, computeLatency, routeLabel } from "@/lib/hyperlane";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get("limit") ?? "20");

  try {
    const messages = await fetchMessages(limit);

    const enriched = messages.map((m) => ({
      ...m,
      latencySeconds: computeLatency(m),
      routeLabel: routeLabel(m.originChainId, m.destinationChainId),
    }));

    return NextResponse.json(enriched);
  } catch (err) {
    console.error("API route error:", err);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}