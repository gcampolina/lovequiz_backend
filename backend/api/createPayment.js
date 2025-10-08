import { createPayment } from "../src/controllers/paymentController.js";

export default async function handler(req, res) {
  // === CORS ===
  res.setHeader("Access-Control-Allow-Origin", "https://yourlovelanguage.netlify.app");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end(); // responder preflight
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await createPayment(req, res);
  } catch (err) {
    console.error("Erro createPayment:", err);
    res.status(500).json({ error: "Erro interno" });
  }
}
