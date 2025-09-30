import React, { useState } from "react";
import "./Chat.css";

export default function HRChatWidget() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Përshëndetje! 👋 Jam HR Assistant 🤖. Zgjidh një nga pyetjet e shpeshta ose shkruaj pyetjen tënde.",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);

  const suggestions = [
    "📄 Dokumentet për kontratë",
    "🕒 Orari i punës",
    "💰 Si llogaritet paga ime?",
    "🏥 Benefitet shëndetësore",
    "🎓 Trajnime dhe kurse",
  ];

  const sendMessage = (content) => {
    if (!content.trim()) return;

    const userMsg = {
      role: "user",
      content,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);

    // Hiq sugjerimet pasi dërgohet një mesazh
    setShowSuggestions(false);

    setTimeout(() => {
      const botMsg = {
        role: "assistant",
        content: `(Demo) Mora mesazhin: ${content}`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);

    setInput("");
  };

  return (
    <div className="chat-wrapper">
      <div className="chat-container">
        {/* Header */}
        <div className="chat-header">UBT HR Assistant 🤖</div>

        {/* Body */}
        <div className="chat-body">
          {messages.map((m, i) => (
            <div key={i} className={`message ${m.role}`}>
              {m.role === "assistant" && (
                <div className="avatar bot">
                  <img src="/bot.png" alt="bot" />
                </div>
              )}
              <div className="bubble">
                {m.role === "assistant" && <div className="sender">HR Assistant</div>}
                <div>{m.content}</div>
                <div className="time">{m.time}</div>
              </div>
              {m.role === "user" && (
                <div className="avatar user">
                  <img src="/user.png" alt="user" />
                </div>
              )}
            </div>
          ))}

          {/* Suggestions */}
          {showSuggestions && (
            <div className="suggestions">
              {suggestions.map((s, i) => (
                <button key={i} onClick={() => sendMessage(s)}>
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Input */}
        <div className="chat-input">
          <input
            type="text"
            placeholder="Shkruaj mesazhin..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
          />
          <button onClick={() => sendMessage(input)}>➤</button>
        </div>
      </div>
    </div>
  );
}
