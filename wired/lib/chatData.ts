export interface Message {
  from: string;
  text: string;
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
      { from: "Mary", text: "Hey there! How are you?" },
      { from: "You", text: "Hi Mary! I'm good, how about you?" },
      { from: "Mary", text: "Doing well, thanks!" },
    ],
  },
  {
    id: "therese",
    name: "Therese",
    messages: [
      { from: "Therese", text: "Are you coming to the meeting?" },
      { from: "You", text: "Yes, I'll be there." },
      { from: "Therese", text: "Great, see you!" },
    ],
  },
  {
    id: "brian",
    name: "Brian",
    messages: [
      { from: "Brian", text: "Did you finish the report?" },
      { from: "You", text: "Almost done, sending soon." },
      { from: "Brian", text: "Awesome, thanks!" },
    ],
  },
  {
    id: "rei",
    name: "Rei",
    messages: [
      { from: "Rei", text: "Let's catch up later." },
      { from: "You", text: "Sure, ping me anytime." },
      { from: "Rei", text: "Will do!" },
    ],
  },
];
