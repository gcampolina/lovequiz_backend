// src/controllers/paymentController.js
import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });

export const createPayment = async (req, res) => {
  const { amount } = req.body;

  try {
    const preference = new Preference(client);

    const response = await preference.create({
      body: {
        items: [
          { title: "LoveQuiz - Resultado do Quiz", quantity: 1, unit_price: parseFloat(amount), currency_id: "BRL" }
        ],
        back_urls: {
          success: "https://yourlovelanguage.netlify.app/result.html?paid=true",
          failure: "https://yourlovelanguage.netlify.app/result.html?paid=false",
          pending: "https://yourlovelanguage.netlify.app/result.html?paid=pending"
        },
        auto_return: "approved"
      }
    });

    res.json({ checkout_url: `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${response.id}` });
  } catch (err) {
    console.error("Erro Mercado Pago:", err);
    res.status(500).json({ error: "Erro ao criar pagamento" });
  }
};

// Se você ainda quiser uma rota de status (simulada):
export const checkPaymentStatus = (req, res) => {
  const { id } = req.params;
  res.json({
    paymentId: id,
    status: "approved"
  });
};
