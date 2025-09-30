import React, { useState } from "react";
import "./Chat.css";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMsg = {
      role: "user",
      content: text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((m) => [...m, userMsg]);
    setInput("");
    setIsTyping(true);

    // Dummy response (backend API e ndërron më vonë)
    setTimeout(() => {
      const botMsg = {
        role: "assistant",
        content: `(Demo) Mora mesazhin: ${text}`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((m) => [...m, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">UBT HR Assistant 🤖</div>

      <div className="chat-body">
        {messages.map((m, i) => (
          <div key={i} className={`message ${m.role}`}>
            {m.role === "assistant" && (
              <img src="/bot.gif" alt="bot" className="avatar" />
            )}
            <div className="bubble">
              {m.content}
              <div className="time">{m.time}</div>
            </div>
            {m.role === "user" && (
              <img src="/user.png" alt="user" className="avatar" />
            )}
          </div>
        ))}

        {isTyping && (
          <div className="message assistant">
            <img src="/bot.gif" alt="bot" className="avatar" />
            <div className="typing">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
      </div>

      <div className="quick-questions">
        <button onClick={() => sendMessage("Si aplikoj për pushim?")}>Si aplikoj për pushim?</button>
        <button onClick={() => sendMessage("Cilat janë dokumentet për kontratë?")}>Dokumentet për kontratë</button>
        <button onClick={() => sendMessage("Orari i punës?")}>Orari i punës</button>
      </div>

      <form
        className="chat-input"
        onSubmit={(e) => {
          e.preventDefault();
          if (input.trim()) sendMessage(input.trim());
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Shkruaj mesazhin..."
        />
        <button type="submit">➤</button>
      </form>
    </div>
  );
};

export default Chat;
