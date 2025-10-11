"use client";
import React, { useRef, useEffect } from "react";
import { notFound } from "next/navigation";
import { useChat } from "@/hooks/useChat";
import MessageBubble from "@/components/ui/MessageBubble";
import Avatar from "@/components/ui/Avatar";
import MessageInput from "@/components/MessageInput";
import { LoadingState } from "@/components/ui/Loading";

interface ChatPageProps {
  params: Promise<{ id: string }>;
}

export default function ChatPage({ params }: ChatPageProps) {
  const { id } = React.use(params);
  const { chatUser, messages, sendMessage, markAsRead, isLoading, error } = useChat(id);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Mark messages as read when user enters chat
  useEffect(() => {
    markAsRead();
  }, [markAsRead]);

  if (!chatUser) {
    return notFound();
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-red-500 mb-2">Failed to load chat</p>
          <p className="text-muted text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <ChatHeader user={chatUser} />
      
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {messages.length === 0 ? (
          <EmptyState userName={chatUser.name} />
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <MessageBubble
                key={message.id}
                message={message}
                showAvatar={shouldShowAvatar(messages, index)}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="border-t border-card-border">
        <MessageInput 
          onSend={sendMessage} 
          disabled={isLoading}
          placeholder={`Message ${chatUser.name}...`}
        />
      </div>
    </div>
  );
}

function ChatHeader({ user }: { user: { name: string; status?: string } }) {
  return (
    <div className="flex items-center gap-3 px-6 py-4 border-b border-card-border bg-card-background/50">
      <Avatar user={user} size="lg" showStatus={'status' in user} />
      <div className="flex-1">
        <h1 className="font-semibold text-foreground">{user.name}</h1>
        {'status' in user && (
          <p className="text-sm text-muted capitalize">{user.status}</p>
        )}
      </div>
    </div>
  );
}

function EmptyState({ userName }: { userName: string }) {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center max-w-sm">
        <div className="w-16 h-16 bg-card-border rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">
          Start a conversation with {userName}
        </h3>
        <p className="text-muted text-sm">
          Send a message to begin your chat
        </p>
      </div>
    </div>
  );
}

function shouldShowAvatar(messages: any[], currentIndex: number): boolean {
  if (currentIndex === 0) return true;
  
  const currentMessage = messages[currentIndex];
  const previousMessage = messages[currentIndex - 1];
  
  return currentMessage.senderId !== previousMessage.senderId;
}
