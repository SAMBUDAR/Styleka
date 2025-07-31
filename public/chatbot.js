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
    You are Styleka Assistant, a friendly and knowledgeable fashion and shopping expert for an e-commerce site.

    When a user asks about clothes, footwear, accessories, styling tips, or order help, provide smart, helpful replies like a real fashion stylist and shopping assistant.

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
  "new arrivals": "new-arrivals",
  "best sellers": "best-sellers",
  "offers": "offers",
  "my orders": "orders",
  "return policy": "returns"
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
      const botReply = data.reply || "Sorry, no reply.";
      chatHistory.push({ role: "assistant", content: botReply });
      chatbox.lastChild.querySelector("p").textContent = botReply;
      chatbox.scrollTop = chatbox.scrollHeight;

      // After updating bot reply text in chat window:
      const previewContainer = document.createElement('div');
      previewContainer.className = 'preview-button-container';

const lowerUserMessage = userMessage.toLowerCase();
const showAllButtons = lowerUserMessage.includes("list of functionalities") 
                    || lowerUserMessage.includes("features") 
                    || lowerUserMessage.includes("what can you do");

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
  const tab = document.getElementById(tabId);
  if (tab) {
    tab.scrollIntoView({ behavior: 'smooth' });
  }
}

// 🔥 Make it globally accessible
window.switchTab = switchTab;

});
