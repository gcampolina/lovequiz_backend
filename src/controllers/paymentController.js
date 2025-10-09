// src/controllers/paymentController.js
import { MercadoPagoConfig, Preference, Payment } from "mercadopago";

// Inicializa o cliente do Mercado Pago com o token do .env
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });

// Função para criar pagamento
export const createPayment = async (req, res) => {


  try {
    const preference = new Preference(client);

    const response = await preference.create({
        body: {
          items: [
            {
              title: "LoveQuiz - Resultado do Quiz",
              quantity: 1,
              unit_price: 0.30,
              currency_id: "BRL",
            },
          ],
          back_urls: {
            success: "https://yourlovelanguage.netlify.app/result.html",
            failure: "https://yourlovelanguage.netlify.app/result.html",
            pending: "https://yourlovelanguage.netlify.app/result.html",
          },
          auto_return: "approved",
          notification_url: "https://lovequiz-backend.vercel.app/api/webhook",
          payment_methods: {
            excluded_payment_types: [],
            excluded_payment_methods: [],
            installments: 1,
          },
        },
    });


    res.json({
      preference_id: response.id,
      checkout_url: `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${response.id}`,
    });
  } catch (err) {
    console.error("Erro Mercado Pago:", err);
    res.status(500).json({ error: "Erro ao criar pagamento" });
  }
};


// ✅ Checar status de pagamento real
export const checkPaymentStatus = async (req, res) => {
  const { id } = req.params;

  try {
    const payment = await new Payment(client).get({ id });
    res.json({ status: payment.status });
  } catch (err) {
    console.error("Erro ao checar pagamento:", err);
    res.status(500).json({ error: "Erro ao verificar pagamento" });
  }
};




// ✅ Webhook para receber notificações automáticas
export const paymentWebhook = async (req, res) => {
  try {
    const { type, data } = req.body;

    if (type === "payment" && data && data.id) {
      const paymentData = await new Payment(client).get({ id: data.id });

      if (paymentData.status === "approved") {
        console.log("✅ Pagamento aprovado:", paymentData.id);
        // Aqui você poderia salvar no banco, liberar acesso etc.
      } else {
        console.log("ℹ️ Pagamento ainda não aprovado:", paymentData.status);
      }
    }

    res.sendStatus(200);
  } catch (err) {
    console.error("Erro no webhook:", err);
    res.sendStatus(500);
  }
};