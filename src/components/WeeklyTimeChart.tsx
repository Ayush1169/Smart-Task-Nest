"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type Props = {
  data: { day: string; seconds: number }[];
};

export default function WeeklyTimeChart({ data = [] }: Props) {
  const chartData = data.map((d) => ({
    day: d.day,
    hours: +(d.seconds / 3600).toFixed(2),
  }));

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis tickFormatter={(v) => `${v}h`} />
        <Tooltip formatter={(v: number) => `${v} hours`} />
        <Line
          type="monotone"
          dataKey="hours"
          stroke="#22c55e"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}