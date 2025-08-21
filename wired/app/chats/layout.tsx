import Sidebar from "../../components/Sidebar";

export default function ChatsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen pattern-bg">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}
