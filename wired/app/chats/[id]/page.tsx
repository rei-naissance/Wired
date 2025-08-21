import ChatWindow from "../../../components/ChatWindow";
import { chatUsers } from "../../../lib/chatData";
import { notFound } from "next/navigation";

interface ChatPageProps {
  params: { id: string };
}

export default function ChatPage({ params }: ChatPageProps) {
  const user = chatUsers.find((u) => u.id === params.id);
  if (!user) return notFound();
  return (
    <div className="flex flex-col gap-8 p-8">
      <ChatWindow user={user.name} messages={user.messages} />
    </div>
  );
}
