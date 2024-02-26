// Using Nextjs API routes
import crypto from "crypto";

// Your secret key from Paystack
const API_SECRET_KEY = "yoursecretkey";

// Your webhook URL
export async function POST(req, res) {
  // Retrieve the request's body
  const event = req.body;

  // Retrieve the signature header
  const signature = req.headers["x-paystack-signature"];

  // Verify the event origin
  if (verify(event, signature)) {
    // Acknowledge the event
    res.status(200).end();

    const eventType = event.event;

    console.log(eventType);
    // Handle the event data
    // Do something with event
  } else {
    // Reject the event
    res.status(400).end();
  }
}

// Verify the event origin
function verify(eventData, signature) {
  const hmac = crypto.createHmac("sha512", API_SECRET_KEY);
  const expectedSignature = hmac
    .update(JSON.stringify(eventData))
    .digest("hex");
  return expectedSignature === signature;
}

// import { NextResponse } from "next/server";
// import crypto from "crypto";

// const secret = process.env.PAYSTACK_SECRET_KEY as string;

// export function POST(req: Request) {
//   // Check if the request method is POST
//   if (req.method === "POST") {
//     // Validate the event
//     const hash = crypto
//       .createHmac("sha512", secret)
//       .update(JSON.stringify(req.body))
//       .digest("hex");

//     const event = req.body;

//     const eventType = event?.event;

//     if (hash === req.headers.get("x-paystack-signature")) {
//       // Retrieve the request body
//       // Do something with the event
//       if (eventType === "charge.success") {
//         console.log("Transfer successful");
//         return NextResponse.json({
//           message: "Transfer successful",
//           event: event,
//         });
//       }
//       console.log("Outside event");
//     }

//     console.log(event);

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
//   console.log(event);
//   console.log(event?.event);
//   return new Response("", { status: 200 });
// }
