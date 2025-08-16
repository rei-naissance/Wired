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
      <div className="flex items-center p-2 border-t border-gray-200">
        <div className="relative flex-1">
          <input
            type="text"
            className="w-full px-4 py-2 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmit(e);
              }
            }}
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-transparent hover:bg-transparent focus:outline-none px-2 py-1 transition-transform transition-opacity duration-150 hover:scale-110 hover:opacity-80"
            style={{ background: 'none', color: 'white' }}
            onClick={handleSubmit}
          >
            <Send size={20} color="white" />
          </button>
        </div>
      </div>
    );
}