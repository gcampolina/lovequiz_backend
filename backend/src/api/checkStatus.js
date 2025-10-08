export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { id } = req.query; // o Vercel envia parâmetros de URL em req.query

    // Aqui você poderia integrar com a API do Mercado Pago se quiser o status real.
    // Por enquanto, simula um retorno de sucesso.
    res.status(200).json({
      paymentId: id || "unknown",
      status: "approved",
      message: "Pagamento confirmado com sucesso ✅"
    });
  } catch (error) {
    console.error("Erro ao verificar status:", error);
    res.status(500).json({ error: "Erro ao verificar status do pagamento" });
  }
}
