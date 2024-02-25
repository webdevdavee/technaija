import crypto from "crypto";
const secret = process.env.PAYSTACK_SECRET_KEY;

export default function handler(req, res) {
  // Validate event
  const hash = crypto
    .createHmac("sha512", secret)
    .update(JSON.stringify(req.body))
    .digest("hex");
  if (hash == req.headers["x-paystack-signature"]) {
    // Retrieve the request's body
    const event = req.body;
    if (event?.event === "charge.success") {
      console.log("Transfer successful");
    }
  }
  res.status(200).send("OK");
}

// import { NextResponse } from "next/server";
// import crypto from "crypto";

// interface HeadersWithSignature extends Headers {
//   "x-paystack-signature": string;
// }

// interface PaystackEvent {
//   event: string;
// }

// const secret = process.env.PAYSTACK_SECRET_KEY as string;

// export function POST(req: Request) {
//   // Check if the request method is POST
//   if (req.method === "POST") {
//     // Validate the event
//     const hash = crypto
//       .createHmac("sha512", secret)
//       .update(JSON.stringify(req.body))
//       .digest("hex");

//     const headers = req.headers as HeadersWithSignature;

//     if (hash === headers["x-paystack-signature"]) {
//       // Retrieve the request body
//       const event = req.body as unknown as PaystackEvent;
//       // Do something with the event
//       if (event && event.event === "charge.success") {
//         console.log("Transfer successful");
//         return NextResponse.json({
//           message: "Transfer successful",
//           event: event,
//         });
//       }
//     }

//     // Send a 200 response
//     return new Response("", { status: 200 });
//   } else {
//     // Send a 405 response for other methods
//     return new Response("Method Not Allowed", { status: 405 });
//   }
// }

// Paystack Webhook function ends here

// import { NextRequest, NextResponse } from "next/server";
// interface PaystackEvent {
//   event: string;
// }

// export function POST(req: NextRequest, res: NextResponse) {
//   // Retrieve the request's body
//   const event = req.body as unknown as PaystackEvent;
//   if (event?.event === "charge.success") {
//     console.log("Transfer successful");
//     return NextResponse.json({
//       message: "Transfer successful",
//       event: event,
//     });
//   }
//   return new Response("", { status: 200 });
// }
