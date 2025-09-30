import React, { useState } from "react";

const API_URL = "http://localhost:5148";

const HRChatWidget = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async (text) => {
    const userMsg = { role: "user", content: text, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
    setMessages((m) => [...m, userMsg]);
    setInput("");

    try {
      const res = await fetch(`${API_URL}/api/hr/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [userMsg] }),
      });
      const data = await res.json();
      const reply = {
        role: "assistant",
        content: data.choices?.[0]?.message?.content || "❌ Error (dummy mode).",
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      };
      setMessages((m) => [...m, reply]);
    } catch (err) {
      setMessages((m) => [...m, { role: "assistant", content: "Gabim serveri.", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }]);
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
              ...styles.messageWrapper,
              justifyContent: m.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                ...styles.message,
                ...(m.role === "user" ? styles.userMsg : styles.assistantMsg),
              }}
            >
              <div>{m.content}</div>
              <div style={styles.timestamp}>{m.time}</div>
            </div>
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
    width: 420,
    borderRadius: 20,
    overflow: "hidden",
    background: "#fefefe",
    boxShadow: "0 6px 24px rgba(0,0,0,0.12)",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    background: "#128C7E",
    color: "white",
    padding: "14px 18px",
    fontWeight: "bold",
    fontSize: "16px",
  },
  chatBox: {
    flex: 1,
    padding: 16,
    background: "#ECE5DD",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  messageWrapper: {
    display: "flex",
    width: "100%",
  },
  message: {
    padding: "10px 14px",
    borderRadius: 20,
    maxWidth: "70%",
    fontSize: "14px",
    lineHeight: "1.4",
    boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
    animation: "fadeIn 0.3s ease",
    position: "relative",
  },
  userMsg: {
    background: "#DCF8C6",
    alignSelf: "flex-end",
  },
  assistantMsg: {
    background: "#ffffff",
    alignSelf: "flex-start",
  },
  timestamp: {
    fontSize: "11px",
    color: "#999",
    marginTop: 4,
    textAlign: "right",
  },
  inputArea: {
    display: "flex",
    padding: 10,
    borderTop: "1px solid #ddd",
    background: "white",
  },
  input: {
    flex: 1,
    padding: "12px 16px",
    borderRadius: 25,
    border: "1px solid #ccc",
    outline: "none",
    fontSize: 14,
    transition: "0.2s",
  },
  sendBtn: {
    marginLeft: 10,
    border: "none",
    borderRadius: "50%",
    background: "#128C7E",
    color: "white",
    width: 44,
    height: 44,
    cursor: "pointer",
    fontSize: 18,
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
  },
};

export default HRChatWidget;
