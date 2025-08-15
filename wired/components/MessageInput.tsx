"use client";

import { useState } from "react";
import { Send } from "lucide-react";

interface MessageInputProps {
  onSend: (message: string) => void;
}

export default function MessageInput({ onSend }: MessageInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    onSend(inputValue);
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-card-border p-4 flex">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 bg-card-background border border-card-border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary text-foreground transition-all duration-300 ease-in-out"
      />
      <button
        type="submit"
        className="bg-primary hover:bg-primary-hover text-black font-semibold px-4 py-2 rounded-r-lg transition-colors duration-300 ease-in-out flex items-center justify-center"
      >
        <Send size={20} />
      </button>
    </form>
  );
}