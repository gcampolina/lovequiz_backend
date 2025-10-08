import express from "express";
import { checkPaymentStatus, createPayment  } from "../controllers/paymentController.js";

const router = express.Router();


router.post("/create", createPayment);
router.get("/status/:id", checkPaymentStatus);



export default router;
