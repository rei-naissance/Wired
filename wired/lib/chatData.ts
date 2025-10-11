export interface User {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  status: 'online' | 'offline' | 'away';
}

export interface Message {
  id: string;
  senderId: string;
  chatId: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file';
  status: 'sending' | 'sent' | 'delivered' | 'read';
}

export interface Chat {
  id: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  updatedAt: Date;
}

export interface ChatUser extends User {
  messages: Message[];
}

// Mock current user for demo
export const currentUser: User = {
  id: "current-user",
  name: "You",
  status: "online"
};

// Mock users
export const users: User[] = [
  currentUser,
  { id: "mary", name: "Mary", status: "online" },
  { id: "therese", name: "Therese", status: "online" },
  { id: "brian", name: "Brian", status: "away" },
  { id: "rei", name: "Rei", status: "online" },
];

// Helper to generate message IDs
let messageCounter = 1;
const generateMessageId = () => `msg-${messageCounter++}`;

export const chatUsers: ChatUser[] = [
  {
    id: "mary",
    name: "Mary",
    status: "online",
    messages: [
      { 
        id: generateMessageId(),
        senderId: "mary", 
        chatId: "mary",
        content: "Hey there! How are you?", 
        timestamp: new Date(Date.now() - 600000),
        type: "text",
        status: "read"
      },
      { 
        id: generateMessageId(),
        senderId: "current-user", 
        chatId: "mary",
        content: "Hi Mary! I'm good, how about you?", 
        timestamp: new Date(Date.now() - 590000),
        type: "text",
        status: "read"
      },
      { 
        id: generateMessageId(),
        senderId: "mary", 
        chatId: "mary",
        content: "Doing well, thanks!", 
        timestamp: new Date(Date.now() - 580000),
        type: "text",
        status: "read"
      },
    ],
  },
  {
    id: "therese",
    name: "Therese",
    status: "online",
    messages: [
      { 
        id: generateMessageId(),
        senderId: "therese", 
        chatId: "therese",
        content: "Are you coming to the meeting?", 
        timestamp: new Date(Date.now() - 600000),
        type: "text",
        status: "read"
      },
      { 
        id: generateMessageId(),
        senderId: "current-user", 
        chatId: "therese",
        content: "Yes, I'll be there.", 
        timestamp: new Date(Date.now() - 590000),
        type: "text",
        status: "read"
      },
      { 
        id: generateMessageId(),
        senderId: "therese", 
        chatId: "therese",
        content: "Great, see you!", 
        timestamp: new Date(Date.now() - 580000),
        type: "text",
        status: "read"
      },
    ],
  },
  {
    id: "brian",
    name: "Brian",
    status: "away",
    messages: [
      { 
        id: generateMessageId(),
        senderId: "brian", 
        chatId: "brian",
        content: "Did you finish the report?", 
        timestamp: new Date(Date.now() - 600000),
        type: "text",
        status: "read"
      },
      { 
        id: generateMessageId(),
        senderId: "current-user", 
        chatId: "brian",
        content: "Almost done, sending soon.", 
        timestamp: new Date(Date.now() - 590000),
        type: "text",
        status: "read"
      },
      { 
        id: generateMessageId(),
        senderId: "brian", 
        chatId: "brian",
        content: "Awesome, thanks!", 
        timestamp: new Date(Date.now() - 580000),
        type: "text",
        status: "read"
      },
    ],
  },
  {
    id: "rei",
    name: "Rei",
    status: "online",
    messages: [
      { 
        id: generateMessageId(),
        senderId: "rei", 
        chatId: "rei",
        content: "Let's catch up later.", 
        timestamp: new Date(Date.now() - 600000),
        type: "text",
        status: "read"
      },
      { 
        id: generateMessageId(),
        senderId: "current-user", 
        chatId: "rei",
        content: "Sure, ping me anytime.", 
        timestamp: new Date(Date.now() - 590000),
        type: "text",
        status: "read"
      },
      { 
        id: generateMessageId(),
        senderId: "rei", 
        chatId: "rei",
        content: "Will do!", 
        timestamp: new Date(Date.now() - 580000),
        type: "text",
        status: "read"
      },
    ],
  },
];

// Helper functions
export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

export const getChatUserById = (id: string): ChatUser | undefined => {
  return chatUsers.find(user => user.id === id);
};

// New function to get chat by ID for new architecture
export const getChatById = (id: string): Chat | undefined => {
  const chatUser = getChatUserById(id);
  if (!chatUser) return undefined;
  
  return {
    id: chatUser.id,
    participants: [currentUser, chatUser],
    lastMessage: chatUser.messages[chatUser.messages.length - 1],
    unreadCount: chatUser.messages.filter(m => 
      m.senderId !== currentUser.id && m.status !== 'read'
    ).length,
    updatedAt: chatUser.messages[chatUser.messages.length - 1]?.timestamp || new Date()
  };
};

// Function to get current user
export const getCurrentUser = (): User => currentUser;

export const addMessage = (chatId: string, content: string): Message => {
  const message: Message = {
    id: generateMessageId(),
    senderId: currentUser.id,
    chatId,
    content,
    timestamp: new Date(),
    type: "text",
    status: "sending"
  };

  const chatUser = getChatUserById(chatId);
  if (chatUser) {
    chatUser.messages.push(message);
  }

  return message;
};
