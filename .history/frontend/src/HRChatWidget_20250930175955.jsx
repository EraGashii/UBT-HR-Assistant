import React, { useState, useRef, useEffect } from "react";

const API_URL = "http://localhost:5148";

const HRChatWidget = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const sendMessage = async (text) => {
    const userMsg = { role: "user", content: text };
    setMessages((m) => [...m, userMsg]);
    setInput("");

    try {
      const res = await fetch(`${API_URL}/api/hr/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [userMsg] }),
      });
      const data = await res.json();

      const reply = data.reply || "❌ Error (dummy mode).";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Gabim serveri ❌" },
      ]);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      style={{
        width: 380,
        height: 500,
        display: "flex",
        flexDirection: "column",
        border: "1px solid #ddd",
        borderRadius: 16,
        overflow: "hidden",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#128C7E",
          color: "white",
          padding: "12px",
          fontWeight: "bold",
        }}
      >
        UBT HR Assistant 🤖
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: 10,
          background: "#ECE5DD",
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: m.role === "user" ? "flex-end" : "flex-start",
              marginBottom: 8,
            }}
          >
            <div
              style={{
                background: m.role === "user" ? "#DCF8C6" : "white",
                padding: "8px 12px",
                borderRadius: 12,
                maxWidth: "70%",
                boxShadow: "0 1px 1px rgba(0,0,0,0.1)",
              }}
            >
              {m.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (input.trim()) sendMessage(input.trim());
        }}
        style={{
          display: "flex",
          padding: 8,
          background: "#f0f0f0",
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Shkruaj mesazhin..."
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 20,
            border: "1px solid #ccc",
            outline: "none",
          }}
        />
        <button
          type="submit"
          style={{
            marginLeft: 8,
            background: "#128C7E",
            color: "white",
            border: "none",
            borderRadius: 20,
            padding: "0 16px",
            cursor: "pointer",
          }}
        >
          ➤
        </button>
      </form>
    </div>
  );
};

export default HRChatWidget;
