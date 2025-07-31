import 'dotenv/config';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  try {
    const body = req.body || (await new Promise((resolve, reject) => {
      let data = '';
      req.on('data', chunk => data += chunk);
      req.on('end', () => resolve(JSON.parse(data)));
      req.on('error', reject);
    }));

    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
  return res.status(400).json({ error: 'Messages array is required' });
}

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://wander-wise-smart-routes-hidden-gems-travel-smarter-b7vtijzkc.vercel.app/",
        "X-Title": "Styleka Fashion Assistant"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
          messages: [
    {
      role: "system",
      content: `You are Styleka, a helpful and friendly fashion assistant for an e-commerce clothing site. 
You help users with sizing, return policies, offers, order status, and outfit recommendations based on current trends or occasion. 
Keep your tone stylish, brief, and confident.`
    },
    ...messages
  ]
      }),
    });

    const result = await response.json();
    console.log("OpenRouter API response:", result);

    if (!result.choices || result.choices.length === 0) {
      return res.status(500).json({ error: "No response from model" });
    }

    res.status(200).json({ reply: result.choices[0].message.content });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
}
