"use client";

import { updateTask, deleteTask } from "@/services/task.service";

const statusColor: any = {
  Pending: "bg-yellow-100 text-yellow-700",
  Running: "bg-blue-100 text-blue-700",
  Done: "bg-green-100 text-green-700",
};

export default function TaskRow({
  task,
  refresh,
}: {
  task: any;
  refresh: () => void;
}) {
  return (
    <tr className="border-t hover:bg-gray-50">
      {/* TASK NAME */}
      <td className="px-6 py-4 text-black font-medium">
        {task.title}
      </td>

      {/* ASSIGNED TO (placeholder) */}
      <td className="px-6 py-4">
        <div className="flex -space-x-2">
          <div className="w-8 h-8 rounded-full bg-gray-300" />
          <div className="w-8 h-8 rounded-full bg-gray-400" />
        </div>
      </td>

      {/* DUE DATE */}
      <td className="px-6 py-4 text-gray-500">
        04 Aug 2025
      </td>

      {/* STATUS */}
      <td className="px-6 py-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[task.status]}`}
        >
          {task.status}
        </span>
      </td>

      {/* ACTIONS */}
      <td className="px-6 py-4 flex gap-3">
        <select
          value={task.status}
          onChange={async (e) => {
            await updateTask(task._id, {
              status: e.target.value,
            });
            refresh();
          }}
          className="border rounded px-2 py-1 text-sm"
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
          className="text-red-500 hover:text-red-700"
        >
          🗑
        </button>
      </td>
    </tr>
  );
}
