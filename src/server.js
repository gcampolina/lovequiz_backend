// backend/src/server.js
import express from "express";
import cors from "cors";
import "dotenv/config";

// importar rotas de pagamento
import paymentRoutes from "./controllers/paymentRoutes.js";

const app = express();
app.use(cors({
  origin: "*", // porta do seu frontend (Live Server)
}));
app.use(express.json());

// rota de teste
app.get("/", (req, res) => {
  res.send("LoveQuiz backend is running ❤️");
});

// rotas de pagamento
app.use("/api", paymentRoutes);

export default app;
