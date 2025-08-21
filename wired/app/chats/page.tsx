import ChatWindow from "../../components/ChatWindow";
import { chatUsers } from "../../lib/chatData";
import { useState } from "react";


export default function ChatsPage() {
  const [selectedChat, setSelectedChat] = useState(chatUsers[0].id);
  const user = chatUsers.find((u) => u.id === selectedChat);
  return (
    <div className="flex flex-col gap-8 p-8">
      {user && <ChatWindow user={user.name} messages={user.messages} />}
    </div>
  );
}
