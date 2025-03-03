"use client";

import React, { useState } from "react";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import { useUserStore } from "../store/useUserStore";
import AnimatedQuotes from "@/components/AnimatedComponent";
import UserGoals from "@/components/GlobalUserComponent";

const Landing: React.FC = () => {
  const { user } = useUserStore();
  // const router = useRouter();
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    { sender: "AI", text: "Hi there! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "You", text: input }];
    setMessages(newMessages);

    // Dummy AI response after user sends a message
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "AI", text: "That's interesting! Tell me more." },
      ]);
    }, 1000);

    setInput("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-tertiary text-gray-800">
      {/* Upper Section: Animated Quotes */}
      <div className="h-32 bg-gradient-to-r bg-primary flex items-center justify-center shadow-md">
        <AnimatedQuotes />
      </div>

      {/* Middle Section */}
      <div className="flex-1 p-4 md:p-8 space-y-6">
        {user ? (
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
            {/* Left Column: User Goals */}
            <div className="w-full md:w-1/2 bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-primary mb-4">
                Goals Added World Wide
              </h2>
              <UserGoals />
            </div>

            {/* Right Column: AI Chatbot */}
            <div className="w-full md:w-1/2 bg-white p-6 rounded-xl shadow-lg flex flex-col">
              <h2 className="text-2xl font-bold text-primary mb-4">
                Chat with AI
              </h2>

              {/* Chat Window */}
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

              {/* Message Input */}
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
          </div>
        ) : (
          <div className="min-h-[500px] flex items-center justify-center bg-tertiary">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <h2 className="text-3xl font-bold text-secondary">NAVBAR TITLE</h2>
              <p className="text-secondary mt-2">PERSONAL TRACKER</p>
              <div className="mt-6 space-y-4">
                <Link href="/signup">
                  <button className="bg-primary cursor-pointer hover:bg-hover text-white px-6 py-3 rounded-lg transition-colors">
                    SIGNUP
                  </button>
                </Link>
                <p className="text-tertiary">ALREADY A USER</p>
                <Link href="/login">
                  <button className="bg-primary cursor-pointer hover:bg-hover text-white px-6 py-3 rounded-lg transition-colors">
                    LOGIN
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Landing;