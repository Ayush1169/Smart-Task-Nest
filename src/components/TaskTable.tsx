"use client";

import { updateTask, deleteTask } from "@/services/task.service";

const statusStyles: any = {
  Pending: "bg-yellow-100 text-yellow-700",
  Running: "bg-blue-100 text-blue-700",
  Done: "bg-green-100 text-green-700",
};

export default function TaskTable({
  tasks,
  refresh,
}: {
  tasks: any[];
  refresh: () => void;
}) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
      <table className="w-full">
        {/* ---------- HEADER ---------- */}
        <thead className="bg-gray-50 border-b">
          <tr className="text-left text-sm text-gray-600">
            <th className="px-6 py-4 font-medium">Task Name</th>
            <th className="px-6 py-4 font-medium">Assigned To</th>
            <th className="px-6 py-4 font-medium">Due Date</th>
            <th className="px-6 py-4 font-medium">Status</th>
            <th className="px-6 py-4 font-medium text-right">
              Action
            </th>
          </tr>
        </thead>

        {/* ---------- BODY ---------- */}
        <tbody>
          {tasks.map((task) => (
            <tr
              key={task._id}
              className="border-b last:border-none hover:bg-gray-50 transition"
            >
              {/* TASK NAME */}
              <td className="px-6 py-4 font-medium text-gray-900">
                {task.title}
              </td>

              {/* ASSIGNED (DUMMY AVATAR FOR NOW) */}
              <td className="px-6 py-4">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-400"></div>
                </div>
              </td>

              {/* DUE DATE */}
              <td className="px-6 py-4 text-gray-600">
                {new Date(task.createdAt).toLocaleDateString()}
              </td>

              {/* STATUS */}
              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[task.status]}`}
                >
                  {task.status}
                </span>
              </td>

              {/* ACTION */}
              <td className="px-6 py-4 text-right">
                <select
                  value={task.status}
                  onChange={async (e) => {
                    await updateTask(task._id, e.target.value);
                    refresh();
                  }}
                  className="border rounded-lg px-2 py-1 text-sm mr-3"
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
                  className="text-red-500 hover:text-red-600"
                >
                  🗑
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
