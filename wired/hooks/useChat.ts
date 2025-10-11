import { useState, useCallback, useMemo } from 'react';
import { Message, ChatUser, getChatUserById, addMessage, currentUser } from '@/lib/chatData';
import { generateId } from '@/lib/utils';

export function useChat(chatId: string) {
  const [chatUser, setChatUser] = useState<ChatUser | null>(() => getChatUserById(chatId) || null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messages = useMemo(() => chatUser?.messages || [], [chatUser]);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || !chatUser) return;

    setIsLoading(true);
    setError(null);

    try {
      // Create optimistic message
      const tempMessage: Message = {
        id: generateId(),
        senderId: currentUser.id,
        chatId,
        content: content.trim(),
        timestamp: new Date(),
        type: 'text',
        status: 'sending'
      };

      // Optimistically update UI
      setChatUser(prev => prev ? {
        ...prev,
        messages: [...prev.messages, tempMessage]
      } : null);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      // Update message status to sent
      setChatUser(prev => prev ? {
        ...prev,
        messages: prev.messages.map(msg => 
          msg.id === tempMessage.id 
            ? { ...msg, status: 'sent' as const }
            : msg
        )
      } : null);

      // In a real app, you would make an API call here
      // const response = await api.sendMessage({ chatId, content });
      
    } catch (err) {
      setError('Failed to send message');
      // Remove the failed message
      setChatUser(prev => prev ? {
        ...prev,
        messages: prev.messages.filter(msg => msg.id !== generateId())
      } : null);
    } finally {
      setIsLoading(false);
    }
  }, [chatId, chatUser]);

  const markAsRead = useCallback(() => {
    if (!chatUser) return;
    
    setChatUser(prev => prev ? {
      ...prev,
      messages: prev.messages.map(msg => 
        msg.senderId !== currentUser.id && msg.status !== 'read'
          ? { ...msg, status: 'read' as const }
          : msg
      )
    } : null);
  }, [chatUser]);

  return {
    chatUser,
    messages,
    sendMessage,
    markAsRead,
    isLoading,
    error
  };
}
