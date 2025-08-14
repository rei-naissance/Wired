"use client";

export default function ContactsList() {
  const contacts = [
    { id: 1, name: "Alex Johnson", status: "online", lastMessage: "Hey there!" },
    { id: 2, name: "Sam Smith", status: "offline", lastMessage: "See you tomorrow" },
    { id: 3, name: "Taylor Brown", status: "online", lastMessage: "Thanks for the help" },
    { id: 4, name: "Jordan Lee", status: "away", lastMessage: "Can we reschedule?" },
    { id: 5, name: "Casey Davis", status: "online", lastMessage: "Working on it now" },
  ];

  return (
    <div className="mt-4">
      <h3 className="px-4 text-sm font-semibold text-muted uppercase tracking-wider">
        Contacts
      </h3>
      <ul className="mt-2 space-y-1">
        {contacts.map((contact) => (
          <li key={contact.id}>
            <a
              href="#"
              className="flex items-center p-3 hover:bg-[#111111] rounded-lg transition-colors"
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <span className="font-semibold text-black">
                    {contact.name.charAt(0)}
                  </span>
                </div>
                <div
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card-background ${
                    contact.status === "online"
                      ? "bg-green-500"
                      : contact.status === "away"
                      ? "bg-yellow-500"
                      : "bg-gray-500"
                  }`}
                ></div>
              </div>
              <div className="ml-3 overflow-hidden">
                <p className="font-medium truncate text-foreground">{contact.name}</p>
                <p className="text-sm text-muted truncate">
                  {contact.lastMessage}
                </p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}