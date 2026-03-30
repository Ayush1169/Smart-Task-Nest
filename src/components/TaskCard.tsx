"use client";

import { updateTask, deleteTask } from "@/services/task.service";

const STATUS_COLOR: any = {
  Pending: "bg-yellow-100",
  Running: "bg-blue-100",
  Done: "bg-green-100",
};

export default function TaskCard({ task, refresh }: any) {
  return (
    <div
      className={`rounded-2xl p-5 shadow-sm ${STATUS_COLOR[task.status]}`}
    >
      <h3 className="font-semibold text-lg mb-1">
        {task.title}
      </h3>

      <p className="text-xs text-gray-500 mb-3">
        Status: {task.status}
      </p>

      <div className="flex items-center justify-between">
        <select
          value={task.status}
          onChange={async (e) => {
            await updateTask(task._id, e.target.value);
            refresh();
          }}
          className="text-sm px-2 py-1 rounded-md"
        >
          <option>Pending</option>
          <option>Running</option>
          <option>Done</option>
        </select>

        <button
          onClick={async () => {
            await deleteTask(task._id);
            refresh();
          }}
          className="text-red-500 text-lg"
        >
          🗑
        </button>
      </div>
    </div>
  );
}
