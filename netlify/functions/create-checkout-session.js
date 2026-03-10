const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }
  try {
    const { priceId, userId, userEmail } = JSON.parse(event.body);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "subscription",
      success_url: "https://splendid-tartufo-2404ef.netlify.app?session_id={CHECKOUT_SESSION_ID}&user_id=" + userId,
      cancel_url: "https://splendid-tartufo-2404ef.netlify.app?cancelled=true",
      customer_email: userEmail,
      metadata: { userId },
    });
    return { statusCode: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url: session.url }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
