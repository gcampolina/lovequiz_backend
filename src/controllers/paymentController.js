// src/controllers/paymentController.js
import { MercadoPagoConfig, Preference } from "mercadopago";

// Inicializa o cliente do Mercado Pago com o token do .env
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });

// Função para criar pagamento
export const createPayment = async (req, res) => {
  const { amount } = req.body;

  try {
    const preference = new Preference(client);

    const response = await preference.create({
      body: {
        items: [
          {
            title: "LoveQuiz - Resultado do Quiz",
            quantity: 1,
            unit_price: parseFloat(amount),
            currency_id: "BRL",
          },
        ],
        back_urls: {
          success: "https://yourlovelanguage.netlify.app/result.html?paid=true",
          failure: "https://yourlovelanguage.netlify.app/result.html?paid=false",
          pending: "https://yourlovelanguage.netlify.app/result.html?paid=pending",
        },
        auto_return: "approved",
        payment_methods: {
          excluded_payment_types: [
            { id: "ticket" }, 
            { id: "atm" }     
          ],
          excluded_payment_methods: [],
          default_payment_method_id: "pix",
          installments: 1,
        },
      },
    });

    res.json({
      checkout_url: `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${response.id}`,
    });
  } catch (err) {
    console.error("Erro Mercado Pago:", err);
    res.status(500).json({ error: "Erro ao criar pagamento" });
  }
};

// Função para checar status do pagamento (simulada)
export const checkPaymentStatus = (req, res) => {
  const { id } = req.params;

  res.json({
    paymentId: id,
    status: "approved",
  });
};
