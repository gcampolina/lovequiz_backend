// src/routes/paymentRoutes.js
import express from "express";
import { createPayment, checkPaymentStatus, paymentWebhook } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-payment", createPayment);
router.get("/check-status/:id", checkPaymentStatus);
router.post("/webhook", paymentWebhook);



export default router;
