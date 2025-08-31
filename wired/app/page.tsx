import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ChatInterface from "@/components/ChatInterface";

export default async function Home() {
  redirect("/chats");
  return null;
}