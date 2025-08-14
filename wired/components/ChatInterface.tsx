"use client";

import { useState, useRef, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import MessageInput from "@/components/MessageInput";

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello there! Welcome to Wires.",
      sender: "Alex",
      timestamp: new Date(Date.now() - 30000),
    },
    {
      id: "2",
      content: "Hi Alex! Excited to be here.",
      sender: "You",
      timestamp: new Date(Date.now() - 15000),
    },
    {
      id: "3",
      content: "This is a real-time chat application with an AMOLED black theme.",
      sender: "Alex",
      timestamp: new Date(),
    },
  ]);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (message: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: "You",
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Chat Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 pattern-bg">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "You" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === "You"
                    ? "bg-primary text-black rounded-br-none"
                    : "bg-card-background text-foreground border border-card-border rounded-bl-none"
                }`}
              >
                <div className="font-semibold text-sm">
                  {message.sender === "You" ? "You" : message.sender}
                </div>
                <div className="mt-1">{message.content}</div>
                <div className="text-xs mt-1 text-muted">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
}