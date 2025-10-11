"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import LoadingSpinner from "./ui/Loading";

interface MessageInputProps {
  onSend: (message: string) => void | Promise<void>;
  disabled?: boolean;
  placeholder?: string;
}

export default function MessageInput({ 
  onSend, 
  disabled = false, 
  placeholder = "Type your message..." 
}: MessageInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === "" || disabled || isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      await onSend(inputValue.trim());
      setInputValue("");
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDisabled = disabled || isSubmitting;

  return (
    <div className="flex items-center p-4">
      <form onSubmit={handleSubmit} className="relative flex-1">
        <input
          type="text"
          className="w-full px-6 py-3 pr-16 rounded-full border border-card-border bg-card-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isDisabled}
        />
        <button
          type="submit"
          disabled={isDisabled || !inputValue.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-primary text-black hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150"
        >
          {isSubmitting ? (
            <LoadingSpinner size="sm" />
          ) : (
            <Send size={16} />
          )}
        </button>
      </form>
    </div>
  );
}