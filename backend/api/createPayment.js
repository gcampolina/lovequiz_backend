// backend/api/createPayment.js
import { createPayment } from "../src/controllers/paymentController.js";

export default async function handler(req, res) {
  // === CORS ===
  res.setHeader("Access-Control-Allow-Origin", "https://yourlovelanguage.netlify.app");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Responde pré-flight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Só permite POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Chama o controller normalmente
  await createPayment(req, res);
}
