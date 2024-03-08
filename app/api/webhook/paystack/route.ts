import crypto from "crypto";
import { createOrder } from "@/libs/actions/orders.action";
import { NextResponse } from "next/server";
import { formatDateToCustom } from "@/libs/utils";

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

    if (eventType === "charge.success") {
      console.log(event);

      const order: CreateOrderParam = {
        orderId: event.data.id,
        firstname: event.data.customer.first_name,
        lastname: event.data.customer.last_name,
        email: event.data.customer.email,
        amount: event.data.amount / 100,
        productName: event.data.metadata.productName,
        productCategory: event.data.metadata.productCategory,
        productImage: event.data.metadata.productImage,
        date: formatDateToCustom(event.data.paid_at),
        status: event.data.status,
        channel: event.data.channel,
        userId: event.data.metadata.userId,
        userPhoto: event.data.metadata.userPhoto,
      };

      const newOrder = await createOrder(order);

      return NextResponse.json({ message: "OK", order: newOrder });
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
