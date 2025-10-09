// src/api/index.js
import express from "express";
import paymentRoutes from "../routes/paymentRoutes.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", paymentRoutes);

export default app;