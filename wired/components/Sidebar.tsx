"use client";

import { useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { chatUsers, currentUser, type ChatUser } from "../lib/chatData";
import { Cable } from "lucide-react";
import Avatar from "./ui/Avatar";
import { formatMessageTime, truncateText } from "@/lib/utils";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const pathname = usePathname();
  const chatIdMatch = pathname.match(/\/chats\/(\w+)/);
  const selectedChat = chatIdMatch ? chatIdMatch[1] : chatUsers[0]?.id;

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const filteredChats: ChatUser[] = useMemo(
    () =>
      chatUsers.filter((user: ChatUser) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );
  
  const filteredContacts: ChatUser[] = filteredChats;

  return (
    <div
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } bg-card-background border-r border-card-border h-full flex flex-col transition-all duration-300`}
    >
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
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>

      {!isCollapsed && (
        <div className="p-2">
          <input
            type="text"
            placeholder="Search chats or contacts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 pl-4 rounded-full bg-card-background border border-card-border text-foreground focus:outline-none"
          />
        </div>
      )}

      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          <li>
            <Link 
              href="/"
              className="flex items-center p-3 text-foreground hover:bg-[#111111] rounded-lg transition-colors"
            >
              <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01" />
              </svg>
              {!isCollapsed && <span className="ml-3">Chats</span>}
            </Link>
          </li>
          <li>
            <Link 
              href="/contacts"
              className="flex items-center p-3 text-foreground hover:bg-[#111111] rounded-lg transition-colors"
            >
              <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              {!isCollapsed && <span className="ml-3">Contacts</span>}
            </Link>
          </li>
          <li>
            <Link 
              href="/settings"
              className="flex items-center p-3 text-foreground hover:bg-[#111111] rounded-lg transition-colors"
            >
              <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              </svg>
              {!isCollapsed && <span className="ml-3">Settings</span>}
            </Link>
          </li>
        </ul>

        {!isCollapsed && (
          <div>
            <h3 className="text-sm font-semibold text-muted mb-1 mt-2">Chats</h3>
            <ul className="space-y-2">
              {filteredChats.map((chat: ChatUser) => {
                const lastMessage = chat.messages[chat.messages.length - 1];
                const unreadCount = chat.messages.filter(m => 
                  m.senderId !== currentUser.id && m.status !== 'read'
                ).length;
                
                return (
                  <li key={chat.id}>
                    <Link
                      href={`/chats/${chat.id}`}
                      className={`group flex items-center gap-3 p-2 rounded-xl bg-card/60 hover:bg-card-border transition cursor-pointer shadow-sm border border-transparent hover:border-primary ${selectedChat === chat.id ? "border-primary" : ""}`}
                    >
                      <Avatar user={chat} size="md" showStatus={true} />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-foreground truncate">
                          {chat.name}
                        </div>
                        <div className="text-xs text-muted truncate">
                          {lastMessage ? truncateText(lastMessage.content, 30) : "No messages yet"}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        {lastMessage && (
                          <span className="text-xs text-muted">
                            {formatMessageTime(lastMessage.timestamp)}
                          </span>
                        )}
                        {unreadCount > 0 && (
                          <span className="bg-primary text-black text-xs rounded-full px-2 py-0.5 min-w-[1.25rem] h-5 flex items-center justify-center">
                            {unreadCount}
                          </span>
                        )}
                      </div>
                    </Link>
                  </li>
                );
              })}
              {filteredChats.length === 0 && (
                <li className="p-2 text-muted">No chats found</li>
              )}
            </ul>
          </div>
        )}

        {!isCollapsed && (
          <div>
            <h3 className="text-sm font-semibold text-muted mb-1 mt-4">Contacts</h3>
            <ul className="space-y-2">
              {filteredContacts.map((contact: ChatUser) => (
                <li key={contact.id} className="flex items-center gap-3 p-2 rounded-xl bg-card/60 hover:bg-card-border transition cursor-pointer shadow-sm border border-transparent hover:border-primary">
                  <Avatar user={contact} size="md" showStatus={true} />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-foreground truncate">
                      {contact.name}
                    </div>
                    <div className="text-xs text-muted truncate capitalize">
                      {contact.status}
                    </div>
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
