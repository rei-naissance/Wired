import { chatUsers } from "../../lib/chatData";
import { redirect } from "next/navigation";

export default function ChatsPage() {
  if (chatUsers.length > 0) {
    redirect(`/chats/${chatUsers[0].id}`);
  }
  return null;
}
