import { chatUsers } from "../../lib/chatData";

export default function ContactsPage() {
  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Contacts</h1>
      <ul className="space-y-4">
        {chatUsers.map((user) => (
          <li key={user.id} className="flex items-center gap-4 p-4 rounded-xl bg-card/60 border border-card-border shadow">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/80 to-muted flex items-center justify-center text-lg font-bold text-background">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="font-semibold text-foreground">{user.name}</div>
              <div className="text-xs text-muted">Online</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
