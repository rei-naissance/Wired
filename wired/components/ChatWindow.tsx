import React from "react";

interface Message {
  from: string;
  text: string;
}

interface ChatWindowProps {
  user: string;
  messages: Message[];
}

export default function ChatWindow({ user, messages }: ChatWindowProps) {
  return (
    <div className="max-w-lg w-full mx-auto bg-card-background border border-card-border rounded-xl shadow p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/80 to-muted flex items-center justify-center text-lg font-bold text-background">
          {user.charAt(0).toUpperCase()}
        </div>
        <span className="text-lg font-semibold text-foreground">{user}</span>
      </div>
      <div className="space-y-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.from === "You" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-xs text-sm shadow-sm "
                ${msg.from === "You"
                  ? "bg-primary text-background rounded-br-none"
                  : "bg-card-border text-foreground rounded-bl-none"}
              `}
            >
              <span>{msg.text}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
