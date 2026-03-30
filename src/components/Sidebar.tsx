"use client";

import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  BarChart2,
  Users,
  LogOut,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";

const menu = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: CheckSquare, label: "Tasks", path: "/tasks" },
  { icon: BarChart2, label: "Analytics", path: "/analytics" },
  { icon: Users, label: "Team", path: "/teams" },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    router.push("/login");
  };

  return (
    <div className="w-60 bg-white h-screen rounded-r-3xl p-5 flex flex-col justify-between shadow-sm">
      {/* TOP */}
      <div>
        <h2 className="text-xl text-black font-semibold mb-8">
          SmartTask
        </h2>

        <div className="space-y-2">
          {menu.map((item) => {
            const active = pathname === item.path;

            return (
              <div
                key={item.label}
                onClick={() => router.push(item.path)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition
                  ${
                    active
                      ? "bg-green-100 text-green-600"
                      : "text-gray-600 hover:text-green-600 hover:bg-gray-100"
                  }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* LOGOUT */}
      <div
        onClick={handleLogout}
        className="flex items-center gap-3 text-gray-500 cursor-pointer hover:text-red-600 px-3 py-2 rounded-lg"
      >
        <LogOut size={18} />
        Logout
      </div>
    </div>
  );
}
