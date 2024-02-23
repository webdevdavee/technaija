import { NextApiRequest, NextApiResponse } from "next";

export function POST(req: NextApiRequest, res: NextApiResponse) {
  // Retrieve the request's body
  const event = req.body;

  // Do something with event
  return new Response("", { status: 200 });
}
