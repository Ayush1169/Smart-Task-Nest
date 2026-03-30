"use client";

import { useState } from "react";
import { createTask } from "@/services/task.service";

export default function AddTaskModal({ refresh }: any) {
  const [title, setTitle] = useState("");

  const addTask = async () => {
    if (!title.trim()) return;
    await createTask({ title });
    setTitle("");
    refresh();
  };

  return (
    <div className="flex gap-3 mb-6 text-gray-700">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        className="border px-4 py-2 rounded-lg w-72"
      />

      <button
        onClick={addTask}
        className="bg-green-600 text-white px-4 py-2 rounded-lg"
      >
        Add Task
      </button>
    </div>
  );
}
