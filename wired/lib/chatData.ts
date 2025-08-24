export interface Message {
  from: string;
  text: string;
  timestamp: Date;
}

export interface ChatUser {
  id: string;
  name: string;
  messages: Message[];
}

export const chatUsers: ChatUser[] = [
  {
    id: "mary",
    name: "Mary",
    messages: [
      { from: "Mary", text: "Hey there! How are you?", timestamp: new Date(Date.now() - 600000) },
      { from: "You", text: "Hi Mary! I'm good, how about you?", timestamp: new Date(Date.now() - 590000) },
      { from: "Mary", text: "Doing well, thanks!", timestamp: new Date(Date.now() - 580000) },
    ],
  },
  {
    id: "therese",
    name: "Therese",
    messages: [
      { from: "Therese", text: "Are you coming to the meeting?", timestamp: new Date(Date.now() - 600000) },
      { from: "You", text: "Yes, I'll be there.", timestamp: new Date(Date.now() - 590000) },
      { from: "Therese", text: "Great, see you!", timestamp: new Date(Date.now() - 580000) },
    ],
  },
  {
    id: "brian",
    name: "Brian",
    messages: [
      { from: "Brian", text: "Did you finish the report?", timestamp: new Date(Date.now() - 600000) },
      { from: "You", text: "Almost done, sending soon.", timestamp: new Date(Date.now() - 590000) },
      { from: "Brian", text: "Awesome, thanks!", timestamp: new Date(Date.now() - 580000) },
    ],
  },
  {
    id: "rei",
    name: "Rei",
    messages: [
      { from: "Rei", text: "Let's catch up later.", timestamp: new Date(Date.now() - 600000) },
      { from: "You", text: "Sure, ping me anytime.", timestamp: new Date(Date.now() - 590000) },
      { from: "Rei", text: "Will do!", timestamp: new Date(Date.now() - 580000) },
    ],
  },
];
