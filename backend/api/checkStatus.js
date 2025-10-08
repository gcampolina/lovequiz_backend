// backend/api/checkStatus.js
import { checkPaymentStatus } from "../src/controllers/paymentController.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  await checkPaymentStatus(req, res);
}
