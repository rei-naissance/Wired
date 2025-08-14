// Settings page
"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default function SettingsPage() {
  const { user } = useUser();
  const router = useRouter();

  if (!user) {
    router.push("/sign-in");
    return null;
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col pattern-bg">
        <div className="border-b border-card-border p-4">
          <div className="flex items-center">
            <button 
              onClick={() => router.back()}
              className="mr-4 p-2 rounded-lg hover:bg-[#111111] text-foreground"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-foreground">Profile Settings</h1>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-2xl">
            <div className="card-pattern rounded-xl p-6">
              <div className="flex items-center mb-6">
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center">
                  <span className="font-bold text-black text-2xl">
                    {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                  </span>
                </div>
                <div className="ml-6">
                  <h2 className="text-2xl font-bold text-foreground">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="text-muted">{user.emailAddresses[0].emailAddress}</p>
                  <p className="text-sm text-muted mt-1">Online</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    defaultValue={user.firstName || ""}
                    className="w-full bg-card-background border border-card-border rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    defaultValue={user.lastName || ""}
                    className="w-full bg-card-background border border-card-border rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue={user.emailAddresses[0].emailAddress}
                    className="w-full bg-card-background border border-card-border rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                  />
                </div>
              </div>
              
              <div className="mt-8">
                <button className="bg-primary hover:bg-primary-hover text-black font-semibold px-4 py-3 rounded-lg transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}