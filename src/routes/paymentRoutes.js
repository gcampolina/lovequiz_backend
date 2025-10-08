import express from "express";
import { createPayment, checkPaymentStatus } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-payment", createPayment);
router.get("/check-status", checkPaymentStatus);

export default router;
