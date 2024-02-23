import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Retrieve the request's body
  const event = req.body;

  // Do something with event
  res.status(200).send("OK");
}
