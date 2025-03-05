"use client"

import React, { useState } from "react";

const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    { sender: "AI", text: "Hi there! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "You", text: input }];
    setMessages(newMessages);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "AI", text: "That's interesting! Tell me more." },
      ]);
    }, 1000);

    setInput("");
  };

  return (
    <div className="w-full md:w-1/2 bg-white p-6 rounded-xl shadow-lg flex flex-col">
      <h2 className="text-2xl font-bold text-primary mb-4">Chat with AI</h2>
      <div className="flex-1 overflow-y-auto border border-secondary rounded-lg p-4 space-y-3 h-64 bg-tertiary">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg max-w-[75%] ${
              msg.sender === "You"
                ? "bg-primary text-white self-end"
                : "bg-tertiary text-secondary self-start"
            }`}
          >
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Type your message..."
          className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none"
        />
        <button
          onClick={handleSendMessage}
          className="bg-primary text-white px-4 py-2 rounded-r-lg hover:bg-hover"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
