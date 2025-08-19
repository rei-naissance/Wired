"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
// import ContactsList from "@/components/ContactsList";
// import ChatList from "@/components/ChatList";
// Mock data for base search implementation
const mockChats = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];
const mockContacts = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
  { id: 4, name: "David" },
];
import { Cable } from "lucide-react"

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [search, setSearch] = useState("");

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Filtered data for demonstration
  const filteredChats = useMemo(
    () =>
      mockChats.filter((chat) =>
        chat.name.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );
  const filteredContacts = useMemo(
    () =>
      mockContacts.filter((contact) =>
        contact.name.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  // Placeholder avatar generator (first letter)
  const Avatar = ({ name }: { name: string }) => (
    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-primary/80 to-muted flex items-center justify-center text-lg font-semibold text-background shadow">
      {name.charAt(0).toUpperCase()}
    </div>
  );

  return (
    <div
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } bg-card-background border-r border-card-border h-full flex flex-col transition-all duration-300`}
    >
      {/* Sidebar Header */}
      <div className="p-4 border-b border-card-border flex items-center justify-between">
        {!isCollapsed && (
          <span className="flex items-center gap-2">
            <Cable className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-bold text-primary">Wired</h2>
          </span>
        )}
        <button
          onClick={toggleSidebar}
          className="text-muted hover:text-foreground p-2 rounded-lg hover:bg-[#111111]"
        >
          {isCollapsed ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Search Bar */}
      {!isCollapsed && (
        <div className="p-2">
          <input
            type="text"
            placeholder="Search chats or contacts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 rounded bg-card-background border border-card-border text-foreground focus:outline-none"
          />
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          <li>
            <Link 
              href="/"
              className="flex items-center p-3 text-foreground hover:bg-[#111111] rounded-lg transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01"
                />
              </svg>
              {!isCollapsed && (
                <span className="ml-3">Chats</span>
              )}
            </Link>
          </li>
          <li>
            <Link 
              href="/"
              className="flex items-center p-3 text-foreground hover:bg-[#111111] rounded-lg transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
              {!isCollapsed && (
                <span className="ml-3">Contacts</span>
              )}
            </Link>
          </li>
          <li>
            <Link 
              href="/settings"
              className="flex items-center p-3 text-foreground hover:bg-[#111111] rounded-lg transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
              </svg>
              {!isCollapsed && (
                <span className="ml-3">Settings</span>
              )}
            </Link>
          </li>
        </ul>

        {/* Chat List */}
        {!isCollapsed && (
          <div>
            <h3 className="text-sm font-semibold text-muted mb-1 mt-2">Chats</h3>
            <ul className="space-y-2">
              {filteredChats.map((chat) => (
                <li key={chat.id} className="group flex items-center gap-3 p-2 rounded-xl bg-card/60 hover:bg-card-border transition cursor-pointer shadow-sm border border-transparent hover:border-primary">
                  <Avatar name={chat.name} />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-foreground truncate">{chat.name}</div>
                    <div className="text-xs text-muted truncate">Last message preview...</div>
                  </div>
                  <span className="ml-auto text-xs text-muted group-hover:text-primary">•</span>
                </li>
              ))}
              {filteredChats.length === 0 && (
                <li className="p-2 text-muted">No chats found</li>
              )}
            </ul>
          </div>
        )}

        {/* Contacts List */}
        {!isCollapsed && (
          <div>
            <h3 className="text-sm font-semibold text-muted mb-1 mt-4">Contacts</h3>
            <ul className="space-y-2">
              {filteredContacts.map((contact) => (
                <li key={contact.id} className="flex items-center gap-3 p-2 rounded-xl bg-card/60 hover:bg-card-border transition cursor-pointer shadow-sm border border-transparent hover:border-primary">
                  <Avatar name={contact.name} />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-foreground truncate">{contact.name}</div>
                    <div className="text-xs text-muted truncate">Online</div>
                  </div>
                </li>
              ))}
              {filteredContacts.length === 0 && (
                <li className="p-2 text-muted">No contacts found</li>
              )}
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
}