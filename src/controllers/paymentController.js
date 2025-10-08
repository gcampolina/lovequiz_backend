// src/controllers/paymentController.js
import mercadopago from "mercadopago";

// Inicializa o Mercado Pago com o token do .env
mercadopago.configurations.setAccessToken(process.env.MP_ACCESS_TOKEN);

// Cria pagamento e retorna checkout_url
export const createPayment = async (req, res) => {
  const { amount } = req.body;

  try {
    const preference = {
      items: [
        {
          title: "LoveQuiz - Resultado do Quiz",
          quantity: 1,
          unit_price: parseFloat(amount),
          currency_id: "BRL",
        },
      ],
      back_urls: {
        success: "https://yourlovelanguage.netlify.app/result.html",
        failure: "https://yourlovelanguage.netlify.app/result.html",
        pending: "https://yourlovelanguage.netlify.app/result.html",
      },
      auto_return: "approved",
      payment_methods: {
        excluded_payment_types: [], // não excluir nenhum tipo (PIX ficará disponível)
        excluded_payment_methods: [],
        installments: 1,
      },
    };

    const response = await mercadopago.preferences.create(preference);

    res.json({
      checkout_url: response.body.init_point, // link oficial do checkout
      preference_id: response.body.id,
    });
  } catch (err) {
    console.error("Erro Mercado Pago:", err);
    res.status(500).json({ error: "Erro ao criar pagamento" });
  }
};

// Checa status do pagamento
export const checkPaymentStatus = async (req, res) => {
  const { payment_id } = req.query;

  if (!payment_id) {
    return res.status(400).json({ error: "payment_id é obrigatório" });
  }

  try {
    const response = await mercadopago.payment.get(payment_id);

    // status pode ser 'approved', 'pending', 'rejected', etc
    res.json({
      paymentId: payment_id,
      status: response.body.status,
      raw: response.body, // opcional, para debug
    });
  } catch (err) {
    console.error("Erro ao consultar pagamento:", err);
    res.status(500).json({ error: "Erro ao consultar pagamento" });
  }
};
