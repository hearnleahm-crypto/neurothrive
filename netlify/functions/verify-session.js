const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  try {
    const { sessionId, userId } = JSON.parse(event.body);

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return { statusCode: 400, body: JSON.stringify({ error: "Not paid" }) };
    }

    const plan = session.amount_total > 500 ? "annual" : "monthly";

    await supabase.from("user_subscriptions").upsert({
      user_id: userId,
      stripe_customer_id: session.customer,
      stripe_subscription_id: session.subscription,
      status: "active",
      plan,
      updated_at: new Date().toISOString(),
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true, plan }),
    };
  } catch (err) {
    console.error("Verify error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
