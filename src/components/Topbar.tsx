"use client";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";

type User = {
  name?: string;
  email?: string;
};

export default function Topbar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      setUser(JSON.parse(userCookie));
    }
  }, []);

  return (
    <div className="flex items-center justify-between mb-8">
      {/* Search */}
      <input
        placeholder="Search task"
        className="px-4 py-2 rounded-lg bg-gray-100 outline-none w-72"
      />

      {/* User Info */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold">
          {user?.name?.[0]?.toUpperCase() || "U"}
        </div>

        <div className="text-sm text-right">
          <p className="font-medium text-black">
            Hello, {user?.name || "User"} 👋
          </p>
          <p className="text-gray-500 text-xs">
            {user?.email}
          </p>
        </div>
      </div>
    </div>
  );
}
