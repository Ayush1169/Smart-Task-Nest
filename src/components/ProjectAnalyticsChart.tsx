"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = {
  Completed: "#22c55e", // green
  Running: "#3b82f6",   // blue
  Pending: "#f97316",   // orange
};

export default function ProjectAnalyticsChart({
  completed,
  running,
  pending,
}: {
  completed: number;
  running: number;
  pending: number;
}) {
  const data = [
    { name: "Completed", value: completed },
    { name: "Running", value: running },
    { name: "Pending", value: pending },
  ];

  // ❌ sab zero hai to graph mat dikhao
  if (completed + running + pending === 0) {
    return (
      <p className="text-gray-400 text-sm mt-8">
        No analytics data yet
      </p>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />
        <Tooltip />

        <Bar dataKey="value" radius={[6, 6, 0, 0]}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[entry.name as keyof typeof COLORS]}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
