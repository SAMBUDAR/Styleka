document.addEventListener("DOMContentLoaded", () => {
  const chatbotToggler = document.querySelector(".chatbot-toggler");
  const closeBtn = document.querySelector(".chatbot .close-btn");
  const chatbox = document.getElementById("chat-window");
  const chatInput = document.getElementById("chat-input");
  const sendChatBtn = document.querySelector("#send-btn");
  const chatForm = document.getElementById("chat-form");

  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();  // Prevent adding a newline
      chatForm.requestSubmit();  // Trigger form submit event
    }
  });

  const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
      darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
      });
    }

  const chatHistory = [
  {
    role: "system",
    content: `
    You are STYLÉKA’s intelligent shopping assistant built into a front-end fashion e-commerce site. You know everything about the STYLÉKA website structure, product pages, blog content, UI design, and available features.

Website Overview:
- STYLÉKA is a fashion storefront with product listings, 15+ individual product pages, a static cart, a fashion blog, a contact form, newsletter, and team info.
- The app includes the following HTML pages: index.html (home), shop.html, sproduct1.html to sproduct15.html, cart.html, contact.html, blog.html, about.html, login.html, register.html.

Main Features:
-  Browse product listings with prices, discounts, and dynamic ratings.
-  View 15+ individual product detail pages with descriptions and images.
-  Static Cart interface that shows added products.
-  Read and explore the Fashion Blog.
-  Fill out the Newsletter form to stay updated.
-  Post and read product reviews (UI only).
-  View Team section and contact support via a form.
-  Fully responsive experience across all screen sizes.

Instructions:
- Answer any user questions intelligently based on this structure.
- If a user asks about products, mention that they can explore 15+ items.
- If they want to view or go to any section, respond with a link (relative HTML file).
- Keep your replies helpful, concise, and friendly. Avoid vague or generic replies.
- Always act as if you're guiding the user through the STYLÉKA website. Mention features, suggest pages, offer help.
- Never claim functionality not present (like payment, dynamic cart, real-time updates).
- Always prefer linking to exact HTML files when users ask to visit or explore something.
- You can use emojis to keep the conversation human and engaging.

Examples of what you should handle:
- "Show me shoes under ₹1500"
- "What's on the blog right now?"
- "Where can I view my cart?"
- "How do I contact you?"
- "Do you have jackets?"
- "Tell me more about STYLÉKA"

You are always aware of the full structure and capabilities of the STYLÉKA frontend.
    You can:
    - Recommend outfits based on occasions (e.g., "What should I wear to a wedding?")
    - Help find specific items (e.g., "Show me black boots under ₹3000")
    - Offer style advice based on trends
    - Answer questions about size guides, return policies, delivery time, etc.
    - Suggest complete looks from Styleka's product range

    Be casual, confident, warm — like a cool stylist who's also great with online shopping.
    `.trim()
  }
];

const tabMap = {
  "new arrivals": "shop.html",
  "best sellers": "shop.html",
  "offers": "shop.html",
  "my orders": "cart.html", // fallback to cart since orders are not dynamic
  "return policy": "contact.html"
};

  chatForm.addEventListener("submit", e => {
    e.preventDefault();
    handleChat();
  });

  chatbotToggler.addEventListener("click", () => {
    document.body.classList.toggle("show-chatbot");
  });
  closeBtn.addEventListener("click", () => {
    document.body.classList.remove("show-chatbot");
  });

  const createChatLi = (message, className) => {
  const li = document.createElement("li");
  li.classList.add("chat", className);

  if (className === "incoming") {
    li.innerHTML = `
      <span class="material-symbols-outlined">smart_toy</span>
      <div class="bot-message-content">
        <p>${message}</p>
      </div>
    `;
  } else {
    li.innerHTML = `<p>${message}</p>`;
  }

  return li;
};


  const handleChat = async () => {
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    chatInput.value = "";
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.appendChild(createChatLi("Thinking...", "incoming"));
    chatbox.scrollTop = chatbox.scrollHeight;



    chatHistory.push({ role: "user", content: userMessage });

    chatInput.disabled = true;
    sendChatBtn.disabled = true;

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: chatHistory }) 
      });


      const data = await response.json();
      function parseMarkdownBold(text) {
        return text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
      }

      const botReply = data.reply || "Sorry, no reply.";
      const formattedReply = parseMarkdownBold(botReply);

      chatHistory.push({ role: "assistant", content: botReply });
      chatbox.lastChild.querySelector("p").innerHTML = formattedReply;

      chatbox.scrollTop = chatbox.scrollHeight;



      // After updating bot reply text in chat window:
      const previewContainer = document.createElement('div');
      previewContainer.className = 'preview-button-container';

const lowerUserMessage = userMessage.toLowerCase();
const showAllButtons = lowerUserMessage.includes("list of functionalities") 
                    || lowerUserMessage.includes("features") 
                    || lowerUserMessage.includes("what can you do");
const exploreIntent = lowerUserMessage.includes("explore new") || lowerUserMessage.includes("explore feature");


const showStaticLinks = lowerUserMessage.includes("about") ||
                        lowerUserMessage.includes("contact") ||
                        lowerUserMessage.includes("cart") ||
                        lowerUserMessage.includes("blog") ||
                        showAllButtons;

if (showStaticLinks) {
  const staticLinks = [
    { label: "🛒 Cart", href: "cart.html" },
    { label: "📬 Contact Us", href: "contact.html" },
    { label: "📰 Blog", href: "blog.html" },
    { label: "ℹ️ About Us", href: "about.html" }
  ];

  const linksContainer = document.createElement('div');
  linksContainer.className = 'static-link-container';

  staticLinks.forEach(link => {
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.label;
    a.className = 'chatbot-link';
    linksContainer.appendChild(a);
  });

  chatbox.lastChild.querySelector('.bot-message-content').appendChild(linksContainer);
}


if (showAllButtons) {
  for (const [keyword, tabId] of Object.entries(tabMap)) {
    const btn = document.createElement('button');
    btn.textContent = `Go to ${keyword.charAt(0).toUpperCase() + keyword.slice(1)}`;
    btn.className = 'preview-button';
    btn.type = "button";
    btn.addEventListener('click', () => {
      switchTab(tabId);
      document.body.classList.remove('show-chatbot');
    });
    previewContainer.appendChild(btn);
  }
} else {
  const lowerReply = botReply.toLowerCase();
  const fashionKeywords = ["return", "returns", "size", "sizing", "offer", "discount", "order", "orders", "recommend", "recommendation", "trending", "popular"];

  if (fashionKeywords.some(word => lowerReply.includes(word))) {
    for (const [keyword, tabId] of Object.entries(tabMap)) {
      const btn = document.createElement('button');
      btn.textContent = `Explore ${keyword.charAt(0).toUpperCase() + keyword.slice(1)}`;
      btn.className = 'preview-button';
      btn.type = "button";
      btn.addEventListener('click', () => {
        switchTab(tabId);
        document.body.classList.remove('show-chatbot');
      });
      previewContainer.appendChild(btn);
    }
  }
}


      // Append buttons if any were created
      if (previewContainer.childElementCount > 0) {
        chatbox.lastChild.querySelector('.bot-message-content').appendChild(previewContainer);
      }

      chatbox.scrollTop = chatbox.scrollHeight;


    } catch (error) {
      chatbox.lastChild.querySelector("p").textContent =
        "Oops, something went wrong.";
      console.error("Fetch error:", error);
    } finally {
      chatInput.disabled = false;
      sendChatBtn.disabled = false;
      chatInput.focus();
    }
  };
  function switchTab(tabId) {
  // If tabId is a page, navigate
  if (tabId.endsWith(".html")) {
    window.location.href = tabId; // open in same page
  } else {
    // else scroll to section if it exists
    const tab = document.getElementById(tabId);
    if (tab) {
      tab.scrollIntoView({ behavior: 'smooth' });
    }
  }
}


// 🔥 Make it globally accessible
window.switchTab = switchTab;

});
