import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ChatInterface from "@/components/ChatInterface";

export default async function Home() {
  const { userId } = await auth();
  
  // If the user is not logged in, redirect to the sign-in page
  if (!userId) {
    redirect("/sign-in");
  }
  
  return <ChatInterface />;
}