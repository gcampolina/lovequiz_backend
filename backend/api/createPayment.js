// backend/api/createPayment.js
import { createPayment } from "../src/controllers/paymentController.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  await createPayment(req, res);
}
