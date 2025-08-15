const express = require("express");
const app = express();
const stripe = require("stripe")("sk_test_51REOhFECJtYsBmLBlRG39DmeRj54tr3dBaa1DZEoCZ4m7LBoCV5JlZ3bSZsQMYUqJln87KmzhIcOXSNeXDJC7uPo00fkQfN74f");
const cors = require("cors");
const path = require("path");

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (HTML, CSS, JS, images, etc.)
app.use(express.static(__dirname));

// Routes for serving HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/success', (req, res) => {
  res.sendFile(path.join(__dirname, 'success.html'));
});

app.get('/cancel', (req, res) => {
  res.sendFile(path.join(__dirname, 'cancel.html'));
});

// Route to create Stripe Checkout session
app.post("/create-checkout-session", async (req, res) => {
  // Log the incoming request to check if it's correct
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
      success_url: 'http://localhost:4242/success', // Fixed port to match server
      cancel_url: 'http://localhost:4242/cancel',   // Fixed port to match server
    });

    // Respond with session id
    res.json({ id: session.id });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Handle 404 for any other routes
app.get('*', (req, res) => {
  res.status(404).send(`
    <h1>404 - Page Not Found</h1>
    <p>The page you're looking for doesn't exist.</p>
    <a href="/">Go back to home</a>
  `);
});

// Start server
const PORT = 4242;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Access your pages at:`);
  console.log(`- Home: http://localhost:${PORT}/`);
  console.log(`- About: http://localhost:${PORT}/about`);
  console.log(`- Direct file access: http://localhost:${PORT}/about.html`);
});
