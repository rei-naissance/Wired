"use client";
import React, { useState, useRef, useEffect } from "react";
import { chatUsers, Message as ChatMessage } from "../../../lib/chatData";
import MessageInput from "../../../components/MessageInput";
import { notFound } from "next/navigation";

interface ChatPageProps {
  params: { id: string };
}

export default function ChatPage({ params }: ChatPageProps) {
  const { id } = React.use(params);
  const user = chatUsers.find((u) => u.id === id);
  if (!user) return notFound();

  const [messages, setMessages] = useState<ChatMessage[]>(user.messages);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (text: string) => {
    setMessages([
      ...messages,
      { from: "You", text, timestamp: new Date() },
    ]);
  };

  return (
    <div className="flex flex-col h-full max-h-screen">
      {/* Chat header */}
      <div className="flex items-center gap-3 px-8 pt-8 pb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/80 to-muted flex items-center justify-center text-lg font-bold text-background">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <span className="text-lg font-semibold text-foreground">{user.name}</span>
      </div>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-8 pb-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.from === "You" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${
                msg.from === "You"
                  ? "bg-primary text-black rounded-br-none"
                  : "bg-card-background text-foreground border border-card-border rounded-bl-none"
              }`}
            >
              <div className="font-semibold text-sm">
                {msg.from}
              </div>
              <div className="mt-1">{msg.text}</div>
              <div className="text-xs mt-1 text-muted text-right">
                {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {/* Message Input */}
      <div>
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
}
