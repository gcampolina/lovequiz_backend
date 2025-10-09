// src/routes/paymentRoutes.js
import express from "express";
import { createPayment, checkPaymentStatus, paymentWebhook } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-payment", createPayment);
router.get("/check-status/:id", checkPaymentStatus);
router.post("/webhook", paymentWebhook);


router.get("/validate-token/:token", (req, res) => {
  const token = req.params.token;
  const entry = activeTokens[token];

  if (entry && entry.status === "approved") {
    res.json({ valid: true });
  } else {
    res.json({ valid: false });
  }
});


export default router;
