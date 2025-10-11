import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8'
};

export default function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClass = sizeClasses[size];
  
  return (
    <div className={`${sizeClass} ${className}`}>
      <svg 
        className="animate-spin" 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
      >
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        />
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
}

export function LoadingState({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="flex items-center gap-3">
        <LoadingSpinner />
        <span className="text-muted">{message}</span>
      </div>
    </div>
  );
}

export function MessageSkeleton() {
  return (
    <div className="flex items-start gap-3 p-4 animate-pulse">
      <div className="w-8 h-8 bg-muted rounded-full flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-muted rounded w-24" />
        <div className="h-10 bg-muted rounded-lg w-48" />
      </div>
    </div>
  );
}
