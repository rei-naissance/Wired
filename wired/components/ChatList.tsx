"use client";

export default function ChatList() {
  const chats = [
    {
      id: 1,
      name: "General Chat",
      lastMessage: "This is a real-time chat application with an AMOLED black theme.",
      timestamp: "10:30 AM",
      unread: 0,
    },
    {
      id: 2,
      name: "Project Alpha",
      lastMessage: "Can we review the requirements tomorrow?",
      timestamp: "9:45 AM",
      unread: 3,
    },
    {
      id: 3,
      name: "Design Team",
      lastMessage: "The new mockups are ready for review",
      timestamp: "Yesterday",
      unread: 0,
    },
    {
      id: 4,
      name: "Random Thoughts",
      lastMessage: "Has anyone seen my keys?",
      timestamp: "Yesterday",
      unread: 12,
    },
  ];

  return (
    <div className="mt-4">
      <h3 className="px-4 text-sm font-semibold text-muted uppercase tracking-wider">
        Chats
      </h3>
      <ul className="mt-2 space-y-1">
        {chats.map((chat) => (
          <li key={chat.id}>
            <a
              href="#"
              className={`flex items-center p-3 hover:bg-[#111111] rounded-lg transition-colors ${
                chat.id === 1 ? "bg-[#111111]" : ""
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <span className="font-semibold text-black">
                  {chat.name.charAt(0)}
                </span>
              </div>
              <div className="ml-3 overflow-hidden flex-1">
                <div className="flex justify-between items-baseline">
                  <p className="font-medium truncate text-foreground">{chat.name}</p>
                  <p className="text-xs text-muted">{chat.timestamp}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted truncate">
                    {chat.lastMessage}
                  </p>
                  {chat.unread > 0 && (
                    <span className="bg-primary text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}