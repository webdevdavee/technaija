import { NextRequest, NextResponse } from "next/server";

export function POST(req: NextRequest, res: NextResponse) {
  // Retrieve the request's body
  const event = req.body;

  // Do something with event
  return new Response("", { status: 200 });
}
