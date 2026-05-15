import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://api.hyperlane.xyz/v1/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `{ __schema { queryType { fields { name } } } }`,
    }),
  });
  const data = await res.json();
  return NextResponse.json(data);
}