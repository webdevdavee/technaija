import crypto from "crypto";
import { NextApiRequest, NextApiResponse } from "next";

interface WebhookEvent {
  // Add properties expected in your webhook event
  // ...
}

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST" || req.url !== "/my/webhook/url") {
    return res.status(404).send("Not found");
  }

  const secret = process.env.SECRET_KEY as string;

  if (!secret) {
    throw new Error("Missing SECRET_KEY environment variable");
  }

  const hash = crypto
    .createHmac("sha512", secret)
    .update(JSON.stringify(req.body))
    .digest("hex");

  if (hash !== req.headers["x-paystack-signature"]) {
    return res.status(401).send("Unauthorized");
  }

  const event: WebhookEvent = req.body;

  // Do something with event
  console.log("Received webhook event:", event); // Example usage

  res.status(200).send("OK");
}
