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
      const reply = data.choices?.[0]?.message?.content || "❌ Error (dummy mode).";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages((m) => [...m, { role: "assistant", content: "Gabim serveri." }]);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>UBT HR Assistant 🤖</div>
      <div style={styles.chatBox}>
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              ...styles.message,
              ...(m.role === "user" ? styles.userMsg : styles.assistantMsg),
            }}
          >
            {m.content}
          </div>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (input.trim()) sendMessage(input.trim());
        }}
        style={styles.inputArea}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Shkruaj mesazhin..."
          style={styles.input}
        />
        <button type="submit" style={styles.sendBtn}>➤</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    width: 400,
    borderRadius: 16,
    overflow: "hidden",
    background: "#f8f9fa",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    background: "#128C7E",
    color: "white",
    padding: "12px 16px",
    fontWeight: "bold",
    fontSize: "16px",
  },
  chatBox: {
    flex: 1,
    padding: 12,
    background: "#ECE5DD",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  message: {
    padding: "10px 14px",
    borderRadius: 18,
    maxWidth: "75%",
    fontSize: "14px",
    lineHeight: "1.4",
    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
  },
  userMsg: {
    background: "#DCF8C6",
    alignSelf: "flex-end",
  },
  assistantMsg: {
    background: "white",
    alignSelf: "flex-start",
  },
  inputArea: {
    display: "flex",
    padding: 8,
    borderTop: "1px solid #ddd",
    background: "white",
  },
  input: {
    flex: 1,
    padding: "10px 14px",
    borderRadius: 20,
    border: "1px solid #ccc",
    outline: "none",
  },
  sendBtn: {
    marginLeft: 8,
    border: "none",
    borderRadius: "50%",
    background: "#128C7E",
    color: "white",
    width: 40,
    height: 40,
    cursor: "pointer",
    fontSize: 16,
  },
};

export default HRChatWidget;
