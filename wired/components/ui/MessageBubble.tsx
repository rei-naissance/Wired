import React from 'react';
import { Message, getUserById, currentUser } from '@/lib/chatData';
import Avatar from './Avatar';
import { formatMessageTime } from '@/lib/utils';

interface MessageBubbleProps {
  message: Message;
  showAvatar?: boolean;
}

export default function MessageBubble({ message, showAvatar = true }: MessageBubbleProps) {
  const sender = getUserById(message.senderId);
  const isCurrentUser = message.senderId === currentUser.id;
  
  if (!sender) return null;

  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} items-end gap-2`}>
      {!isCurrentUser && showAvatar && (
        <Avatar user={sender} size="sm" />
      )}
      
      <div className={`max-w-xs md:max-w-md flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`px-4 py-2 rounded-lg ${
            isCurrentUser
              ? 'bg-primary text-black rounded-br-none'
              : 'bg-card-background text-foreground border border-card-border rounded-bl-none'
          }`}
        >
          {!isCurrentUser && (
            <div className="font-semibold text-sm mb-1">
              {sender.name}
            </div>
          )}
          <div className="break-words">{message.content}</div>
        </div>
        
        <div className={`text-xs text-muted mt-1 flex items-center gap-1 ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
          <span>{formatMessageTime(message.timestamp)}</span>
          {isCurrentUser && (
            <MessageStatus status={message.status} />
          )}
        </div>
      </div>
    </div>
  );
}

function MessageStatus({ status }: { status: Message['status'] }) {
  const statusIcons = {
    sending: '⏳',
    sent: '✓',
    delivered: '✓✓',
    read: '✓✓'
  };
  
  const statusColors = {
    sending: 'text-muted',
    sent: 'text-muted',
    delivered: 'text-muted',
    read: 'text-primary'
  };
  
  return (
    <span className={`${statusColors[status]} text-xs`}>
      {statusIcons[status]}
    </span>
  );
}
