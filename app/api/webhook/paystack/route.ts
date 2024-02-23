import crypto from "crypto";

// Get secret key from environment variables
const secret = process.env.PAYSTACK_SECRET_KEY as string;

// Define request and response types
type Request = {
  method: string;
  body: any;
  headers: {
    [key: string]: string;
  };
};

type Response = {
  status: (code: number) => Response;
  end: () => void;
};

// Export default function for nextjs server
export default function handler(req: Request, res: Response) {
  // Check if request method is POST
  if (req.method === "POST") {
    // Validate event
    const hash = crypto
      .createHmac("sha512", secret)
      .update(JSON.stringify(req.body))
      .digest("hex");
    if (hash == req.headers["x-paystack-signature"]) {
      // Retrieve the request's body
      const event = req.body;
      // Do something with event
    }
    // Send 200 response
    res.status(200).end();
  } else {
    // Send 405 response for other methods
    res.status(405).end();
  }
}
