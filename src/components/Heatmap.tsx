"use client";

export default function Heatmap({ data }: any) {
  return (
    <div className="grid grid-cols-10 gap-2">
      {data.map((d: any, i: number) => {
        let color = "bg-gray-200";

        if (d.seconds > 0) color = "bg-green-300";
        if (d.seconds > 600) color = "bg-green-500";
        if (d.seconds > 1800) color = "bg-green-700";

        return (
          <div
            key={i}
            className={`w-6 h-6 rounded ${color}`}
            title={`${d.date} - ${Math.floor(d.seconds / 60)} min`}
          />
        );
      })}
    </div>
  );
}