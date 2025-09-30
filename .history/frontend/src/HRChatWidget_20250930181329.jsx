import React, { useState, useRef, useEffect } from "react";

const HRChatWidget = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    const userMsg = { role: "user", content: text };
    setMessages((m) => [...m, userMsg]);

    // Dummy reply
    setTimeout(() => {
      const reply = { role: "assistant", content: `(Demo) Mora mesazhin: ${text}` };
      setMessages((m) => [...m, reply]);
    }, 800);

    setInput("");
  };

  return (
    <div style={{
      width: 380,
      borderRadius: 12,
      overflow: "hidden",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      fontFamily: "Arial, sans-serif"
    }}>
      {/* Header */}
      <div style={{
        background: "#128C7E",
        color: "white",
        padding: "12px 16px",
        fontWeight: "bold"
      }}>
        UBT HR Assistant 🤖
      </div>

      {/* Messages */}
      <div style={{
        height: 420,
        overflowY: "auto",
        background: "#ECE5DD",
        padding: "12px"
      }}>
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: m.role === "user" ? "flex-end" : "flex-start",
              marginBottom: 10,
              alignItems: "flex-end"
            }}
          >
            {/* Foto vetëm për assistant */}
            {m.role === "assistant" && (
              <img
                src="https://i.ibb.co/5Wf7gT3/bot.png" // këtu vendos linkun e fotos së botit
                alt="Bot"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  marginRight: 8
                }}
              />
            )}

            {/* Bubble */}
            <div
              style={{
                padding: "10px 14px",
                borderRadius: 20,
                maxWidth: "70%",
                background: m.role === "user" ? "#DCF8C6" : "white",
                boxShadow: "0 1px 2px rgba(0,0,0,0.1)"
              }}
            >
              {m.content}
            </div>

            {/* Foto vetëm për user */}
            {m.role === "user" && (
              <img
                src="https://i.ibb.co/ZdP6b9x/user.png" // këtu vendos linkun e fotos së user-it
                alt="User"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  marginLeft: 8
                }}
              />
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
        }}
        style={{
          display: "flex",
          padding: "10px",
          background: "#f0f0f0"
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Shkruaj mesazhin..."
          style={{
            flex: 1,
            padding: "10px 14px",
            borderRadius: 20,
            border: "1px solid #ccc",
            outline: "none"
          }}
        />
        <button
          type="submit"
          style={{
            marginLeft: 8,
            background: "#128C7E",
            border: "none",
            color: "white",
            borderRadius: "50%",
            width: 40,
            height: 40,
            cursor: "pointer"
          }}
        >
          ➤
        </button>
      </form>
    </div>
  );
};

export default HRChatWidget;
