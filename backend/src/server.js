// backend/src/server.js
import express from "express";
import cors from "cors";
import "dotenv/config";

// importar rotas de pagamento
import paymentRoutes from "./routes/paymentRoutes.js";

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
app.use("/api/payments", paymentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
