const express = require("express");
const app = express();
const stripe = require("stripe")("sk_test_51REOhFECJtYsBmLBlRG39DmeRj54tr3dBaa1DZEoCZ4m7LBoCV5JlZ3bSZsQMYUqJln87KmzhIcOXSNeXDJC7uPo00fkQfN74f");
const cors = require("cors");

// Middleware
app.use(cors());
app.use(express.json());

// Route to create Stripe Checkout session
app.post("/create-checkout-session", async (req, res) => {
  // Log the incoming request to check if it’s correct
  console.log("Request received:", req.body);

  const { items } = req.body;

  // Ensure the items are valid
  if (!items || !Array.isArray(items)) {
    return res.status(400).json({ error: "Invalid items format" });
  }

  // Map through items to format them for Stripe
  const lineItems = items.map(item => ({
    price_data: {
      currency: 'inr',
      product_data: {
        name: item.title,
      },
      unit_amount: item.price * 100, // price in paise
    },
    quantity: item.quantity,
  }));

  try {
    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3000/success.html',
      cancel_url: 'http://localhost:3000/cancel.html',
    });

    // Respond with session id
    res.json({ id: session.id });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
const PORT = 4242;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// cd stripe-backend
// npm start
