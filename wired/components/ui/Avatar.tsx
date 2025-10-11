import React from 'react';
import { User } from '@/lib/chatData';

interface AvatarProps {
  user: User | { name: string; avatar?: string };
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showStatus?: boolean;
}

const sizeClasses = {
  sm: 'w-6 h-6 text-xs',
  md: 'w-8 h-8 text-sm',
  lg: 'w-10 h-10 text-base',
  xl: 'w-20 h-20 text-2xl'
};

const statusColors = {
  online: 'bg-green-500',
  away: 'bg-yellow-500',
  offline: 'bg-gray-500'
};

export default function Avatar({ user, size = 'md', className = '', showStatus = false }: AvatarProps) {
  const sizeClass = sizeClasses[size];
  const initials = user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  
  return (
    <div className={`relative flex-shrink-0 ${className}`}>
      <div className={`${sizeClass} rounded-full bg-gradient-to-br from-primary/80 to-muted flex items-center justify-center font-bold text-background overflow-hidden`}>
        {user.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img 
            src={user.avatar} 
            alt={user.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>
      
      {showStatus && 'status' in user && (
        <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background ${statusColors[user.status]}`} />
      )}
    </div>
  );
}
