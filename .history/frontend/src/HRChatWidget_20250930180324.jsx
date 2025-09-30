import React, { useState } from "react";

const API_URL = "http://localhost:5148";

const HRChatWidget = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

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
      const reply = data.choices?.[0]?.message?.content || "❌ Error.";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages((m) => [...m, { role: "assistant", content: "Gabim serveri." }]);
    }
  };

  return (
    <div style={{ width: 400, border: "1px solid #ddd", borderRadius: 12, padding: 16 }}>
      <h3>UBT HR Assistant 🤖</h3>
      <div style={{ height: 300, overflowY: "auto", marginBottom: 10, padding: 8, background: "#fafafa" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ textAlign: m.role === "user" ? "right" : "left" }}>
            <span
              style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: 12,
                background: m.role === "user" ? "#0078ff" : "#eee",
                color: m.role === "user" ? "white" : "black",
                margin: 4,
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (input.trim()) sendMessage(input.trim());
        }}
        style={{ display: "flex", gap: 8 }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Shkruaj pyetjen..."
          style={{ flex: 1, padding: 8 }}
        />
        <button type="submit">Dërgo</button>
      </form>
    </div>
  );
};

export default HRChatWidget;
