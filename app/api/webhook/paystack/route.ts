import crypto from "crypto";

interface HeadersWithSignature extends Headers {
  "x-paystack-signature": string;
}

interface PaystackEvent {
  event: string;
  // other properties
}
// Define the API route handler
export default async function POST(req: Request, res: Response) {
  const secret = process.env.PAYSTACK_SECRET_KEY as string;
  // Check if the request method is POST
  if (req.method === "POST") {
    // Validate the event
    const hash = crypto
      .createHmac("sha512", secret)
      .update(JSON.stringify(req.body))
      .digest("hex");

    const headers = req.headers as HeadersWithSignature;

    if (hash === headers["x-paystack-signature"]) {
      // Retrieve the request body
      const event = req.body as unknown as PaystackEvent;
      // Do something with the event
      if (event && event.event === "transfer.success") {
        return new Response("Transfer successful", { status: 200 });
      }
    }

    // Send a 200 response
    return new Response("", { status: 200 });
  } else {
    // Send a 405 response for other methods
    return new Response("Method Not Allowed", { status: 405 });
  }
}

// Paystack Webhook function ends here

// import { NextRequest, NextResponse } from "next/server";

// export function POST(req: NextRequest, res: NextResponse) {
//   // Retrieve the request's body
//   const event = req.body;

//   // Do something with event
//   return new Response("", { status: 200 });
// }
