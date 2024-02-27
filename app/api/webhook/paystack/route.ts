import crypto from "crypto";

// Secret key from Paystack
const secret = process.env.PAYSTACK_SECRET_KEY!;

export async function POST(req: Request, res: Response) {
  // Retrieve the request's body
  const body = await req.json();

  // Retrieve the signature header
  const signature = req.headers.get("x-paystack-signature") as string;

  // Verify the event origin
  if (verify(body, signature)) {
    // Acknowledge the event
    new Response("", { status: 200 });

    let event = body;
    const eventType = event?.event;

    // console.log(eventType, "alright");
    if (eventType === "charge.success") {
      console.log(event);
      console.log(event?.data.status);
      console.log(event?.data.reference);
    }

    return new Response("Event handled successfully", { status: 200 });
  } else {
    // Reject the event
    return new Response("Invalid signature", { status: 400 });
  }
}

// Verify the event origin
function verify(eventData: any, signature: string) {
  const hmac = crypto.createHmac("sha512", secret);
  const expectedSignature = hmac
    .update(JSON.stringify(eventData))
    .digest("hex");
  return expectedSignature === signature;
}
