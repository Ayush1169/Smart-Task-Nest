"use client";

import { useEffect, useState } from "react";
import WeeklyTimeChart from "../../components/WeeklyTimeChart";
import { getWeeklyTimeAnalytics, getTodayTime } from "@/services/analytics.service";
import Heatmap from "@/components/Heatmap";
import { getHeatmap } from "@/services/analytics.service";
import { getStreak } from "@/services/analytics.service";

type DataType = {
  day: string;
  seconds: number;
};

export default function AnalyticsPage() {
  const [data, setData] = useState<DataType[]>([]);
  const [todaySeconds, setTodaySeconds] = useState(0);

  useEffect(() => {
    getWeeklyTimeAnalytics().then((res) => {
      setData(res.data);
    });

     getTodayTime().then((res) => {
    setTodaySeconds(res.data.seconds);
  });

  }, []);


const [heatmap, setHeatmap] = useState([]);

useEffect(() => {
  getHeatmap().then((res) => {
    setHeatmap(res.data);
  });
}, []);

const [streak, setStreak] = useState(0);

  getStreak().then((res) => {
    setStreak(res.data.streak);
  });

  // 🔥 CALCULATIONS
  const totalSeconds = data.reduce((acc, d) => acc + d.seconds, 0);

  const maxDay =
    data.length > 0
      ? data.reduce((max, d) =>
          d.seconds > max.seconds ? d : max
        )
      : null;

  const avgSeconds =
  data.length > 0
    ? Math.round(totalSeconds / data.length)
    : 0;

   const formatTime = (sec: number) => {
  if (sec === 0) return "0s";

  if (sec < 60) return `${sec}s`;

  if (sec < 3600) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m ${s}s`;
  }

  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  return `${h}h ${m}m`;
};
  return (
  <div>
    <h1 className="text-4xl font-semibold text-black mb-1">
      Analytics
    </h1>

    {/* 🔥 CARDS */}
    <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
      <Card title="Today" value={formatTime(todaySeconds)} />
      <Card title="Total Time" value={formatTime(totalSeconds)} />

       <Card
    title="Streak"
    value={`🔥 ${streak} day${streak !== 1 ? "s" : ""}`}
  />

      <Card
        title="Most Active Day"
        value={
          maxDay
            ? `${maxDay.day} (${formatTime(maxDay.seconds)})`
            : "N/A"
        }
      />
      <Card title="Avg Daily Time" value={formatTime(avgSeconds)} />
    </div>

    {/* 🔥 WEEKLY GRAPH */}
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="mb-4 font-semibold text-gray-800">
        Weekly Time
      </h2>
      <WeeklyTimeChart data={data} />
    </div>

    {/* 🔥 HEATMAP (YAHAN ADD KAR) */}
    <div className="bg-white p-6 rounded-2xl shadow mt-6">
      <h2 className="mb-4 font-semibold text-gray-800">
        Activity Heatmap
      </h2>

      <Heatmap data={heatmap} />
    </div>
  </div>
);
}



// 🔥 CARD COMPONENT
function Card({ title, value }: any) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-200">
      <p className="text-gray-600 text-sm font-medium">
        {title}
      </p>
      <h2 className="text-2xl font-bold text-black mt-2">
        {value}
      </h2>
    </div>
  );
}