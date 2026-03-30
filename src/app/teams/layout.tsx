import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="flex gap-6">
        <Sidebar />
        <div className="flex-1 bg-white rounded-3xl p-6">
          <Topbar />
          {children}
        </div>
      </div>
    </div>
  );
}