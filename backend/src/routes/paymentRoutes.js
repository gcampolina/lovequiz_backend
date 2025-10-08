import express from "express";
import { createPayment, checkStatus } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-payment", createPayment);
router.get("/check-status/:id", checkStatus);

export default router;
