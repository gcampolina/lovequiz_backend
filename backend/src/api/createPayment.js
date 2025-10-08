import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { amount } = req.body;

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

    res.status(200).json({
      checkout_url: `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${response.id}`
    });
  } catch (error) {
    console.error("Erro Mercado Pago:", error);
    res.status(500).json({ error: "Erro ao criar pagamento" });
  }
}
