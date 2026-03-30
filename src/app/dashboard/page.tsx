"use client";

import { useEffect, useState } from "react";
import ProjectAnalyticsChart from "@/components/ProjectAnalyticsChart";
import { getDashboardSummary } from "@/services/analytics.service";
import { saveTime } from "@/services/time.service";
import { getTasks } from "@/services/task.service";
import { getNotifications } from "@/services/notification.service";
import { acceptInvite } from "@/services/team.service";

type Stats = {
  total: number;
  completed: number;
  running: number;
  pending: number;
};

type Task = {
  _id: string;
  title: string;
};

export default function DashboardPage() {
  // ---------------- STATS ----------------
  const [stats, setStats] = useState<Stats>({
    total: 0,
    completed: 0,
    running: 0,
    pending: 0,
  });

  const [loading, setLoading] = useState(true);

  // ---------------- TASKS ----------------
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<string>("");

  // ---------------- TIME TRACKER ----------------
  const [seconds, setSeconds] = useState(0);
  const [runningTimer, setRunningTimer] = useState(false);
  const [invites, setInvites] = useState([]);


  const [open, setOpen] = useState(false);

  // ---------------- DASHBOARD SUMMARY ----------------
  useEffect(() => {
    getDashboardSummary()
      .then((res) => setStats(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // ---------------- LOAD TASKS ----------------
  useEffect(() => {
    getTasks()
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Task load error", err));
  }, []);

  // ---------------- FRONTEND TIMER ----------------
  useEffect(() => {
    if (!runningTimer) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [runningTimer]);

   const fetchNotifications = async () => {
  try {
    const res = await getNotifications();

    console.log("🔥 NOTIFS:", res.data);

    setInvites(Array.isArray(res.data) ? res.data : []);
  } catch {
    setInvites([]);
  }
};

useEffect(() => {
  fetchNotifications();
}, []);

  // ---------------- FORMAT TIME ----------------
  const formatTime = (sec: number) => {
    const h = Math.floor(sec / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((sec % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = (sec % 60)
      .toString()
      .padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  if (loading) {
    return <p className="text-gray-500 text-lg">Loading dashboard...</p>;
  }

  return (
    <>
      <h1 className="text-4xl font-semibold text-black mb-1">
        Dashboard
      </h1>
      <p className="text-gray-600 mb-8">
        Plan, prioritize, and accomplish your tasks with ease.
      </p>

      <div className="relative inline-block">
  <button onClick={() => setOpen(!open)}>
    🔔
  </button>

  {invites.length > 0 && (
    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-full">
      {invites.length}
    </span>
  )}
</div>

{open && (
  <div className="absolute left-0 mt-2 w-72 bg-white shadow-lg rounded-lg p-3 z-50">
    {invites.length === 0 ? (
      <p className="text-gray-500">No notifications</p>
    ) : (
      invites.map((inv: any) => (
        <div key={inv._id} className="mb-2 border-b pb-2">
          <p className="text-sm text-black">
            {inv.message}
          </p>

          <button
            onClick={async () => {
  await acceptInvite(inv._id);
  fetchNotifications(); // 🔥 important
}}
            className="bg-green-600 text-white px-2 py-1 mt-1 rounded"
          >
            Accept
          </button>
        </div>
      ))
    )}
  </div>
)}

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Projects" value={stats.total} type="primary" />
        <StatCard title="Completed Projects" value={stats.completed} />
        <StatCard title="Running Projects" value={stats.running} />
        <StatCard title="Pending Projects" value={stats.pending} />
      </div>

      {/* ================= LOWER ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* -------- ANALYTICS -------- */}
        <div className="bg-white rounded-2xl p-6 h-60 shadow-sm border">
          <p className="font-medium text-black mb-2">
            Project Analytics
          </p>
          <ProjectAnalyticsChart
            completed={stats.completed}
            running={stats.running}
            pending={stats.pending}
          />
        </div>

        {/* -------- PROGRESS -------- */}
        <div className="bg-white rounded-2xl p-6 h-60 shadow-sm border">
          <p className="font-medium text-black mb-2">
            Project Progress
          </p>

          <h2 className="text-5xl font-semibold text-green-600 mt-8">
            {stats.total === 0
              ? "0%"
              : Math.round(
                  (stats.completed * 100 +
                    stats.running * 50) /
                    stats.total
                ) + "%"}
          </h2>

          <p className="text-gray-500 text-sm">
            Projects completed
          </p>
        </div>

        {/* -------- TIME TRACKER -------- */}
        <div className="bg-green-600 rounded-2xl p-6 h-60 text-white shadow-lg flex flex-col justify-between">
          <div>
            <p className="font-medium">Time Tracker</p>

            {/* ✅ TASK DROPDOWN */}
            <select
              value={selectedTask}
              onChange={(e) => setSelectedTask(e.target.value)}
              className="w-full mt-2 mb-3 p-2 rounded-md text-black"
            >
              <option value="">Select Task</option>
              {tasks.map((task) => (
                <option key={task._id} value={task._id}>
                  {task.title}
                </option>
              ))}
            </select>

            <h2 className="text-4xl font-semibold">
              {formatTime(seconds)}
            </h2>
          </div>

          <div className="flex gap-3 flex-wrap">
            <button
              disabled={runningTimer || !selectedTask}
              onClick={() => setRunningTimer(true)}
              className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium"
            >
              Start
            </button>

            <button
              disabled={!runningTimer}
              onClick={() => setRunningTimer(false)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium"
            >
              Stop
            </button>

            <button
              onClick={() => {
                setSeconds(0);
                setRunningTimer(false);
              }}
              className="bg-green-800 text-white px-4 py-2 rounded-lg font-medium"
            >
              Reset
            </button>

            <button
              disabled={!selectedTask || seconds === 0}
              onClick={async () => {
                try {
                  await saveTime(selectedTask, seconds);
                  setSeconds(0);
                  setRunningTimer(false);
                  alert("Time saved successfully");
                } catch (err: any) {
                  alert(err.response?.data?.message);
                }
              }}
              className="bg-white text-green-700 px-4 py-2 rounded-lg font-medium"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ================= CARD =================
function StatCard({
  title,
  value,
  type,
}: {
  title: string;
  value: number;
  type?: "primary";
}) {
  const styles =
    type === "primary"
      ? "bg-green-600 text-white border-green-600"
      : "bg-white text-black hover:shadow-md";

  return (
    <div className={`rounded-2xl p-6 shadow-sm border ${styles}`}>
      <p className="text-sm opacity-80">{title}</p>
      <h2 className="text-3xl font-semibold mt-2">{value}</h2>
    </div>
  );
}
