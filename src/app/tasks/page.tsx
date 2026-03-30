"use client";

import { useEffect, useState } from "react";
import { getTasks } from "@/services/task.service";
import TaskTable from "@/components/TaskTable";
import AddTaskModal from "@/components/AddTaskModal";

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTasks = () => {
    setLoading(true);
    getTasks()
      .then((res) => setTasks(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
  <div>
    <h1 className="text-3xl font-semibold text-gray-900">
      Tasks
    </h1>
    <p className="text-gray-500 text-sm">
      Manage and track all your tasks
    </p>
  </div>

  <AddTaskModal refresh={loadTasks} />
</div>


      {/* CONTENT */}
      {loading ? (
        <p className="text-gray-400">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="text-gray-400">
          No tasks yet. Add your first task 🚀
        </p>
      ) : (
        <TaskTable tasks={tasks} refresh={loadTasks} />
      )}
    </>
  );
}
