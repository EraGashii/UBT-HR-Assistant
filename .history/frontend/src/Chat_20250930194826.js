import React, { useState, useEffect } from "react";
import "./Chat.css";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showQuickQuestions, setShowQuickQuestions] = useState(true); // ✅ fillon me u shfaq

  // Welcome message
  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content:
          "Përshëndetje! 👋 Jam HR Assistant 🤖. Zgjedh një nga pyetjet e shpeshta ose shkruaj pyetjen tënde.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  }, []);

  const sendMessage = (text) => {
    if (!text.trim()) return;

    // Pasi user-i dërgon një mesazh -> hiq quick questions
    if (showQuickQuestions) setShowQuickQuestions(false);

    const userMsg = {
      role: "user",
      content: text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const botMsg = {
      role: "assistant",
      content: `(Demo) Mora mesazhin: ${text}`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <div className="chat-container">
      <div className="chat-header">UBT HR Assistant 🤖</div>

      <div className="chat-body">
        {messages.map((m, i) => (
          <div key={i} className={`message ${m.role}`}>
            {/* {m.role === "assistant" && <div className="avatar bot">🤖</div>} */}
            {m.role === "assistant" && ( <div className="avatar bot">  <img src="/frontend/public/" alt="bot" /> </div>)}
            <div className="bubble">
              {m.role === "assistant" && <div className="sender">HR Assistant</div>}
              <div>{m.content}</div>
              <div className="time">{m.time}</div>
            </div>
            {m.role === "user" && <div className="avatar user">👤</div>}
          </div>
        ))}
      </div>

      {/* Quick Questions -> vetëm në fillim */}
      {showQuickQuestions && (
        <div className="quick-questions">
          {[
            "📄 Dokumentet për kontratë",
            "🕒 Orari i punës",
            "💰 Si llogaritet paga ime?",
            "🏥 Benefitet shëndetësore",
            "🎓 Trajnime dhe kurse",
          ].map((q, i) => (
            <button key={i} onClick={() => sendMessage(q)}>
              {q}
            </button>
          ))}
        </div>
      )}

      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Shkruaj mesazhin..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
        />
        <button onClick={() => sendMessage(input)}>➤</button>
      </div>
    </div>
  );
};

export default Chat;
