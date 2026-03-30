// src/services/task.service.ts
import{ api } from "./api";

export const getTasks = () => api.get("/tasks");

export const createTask = (data: { title: string }) =>
  api.post("/tasks", data);

export const updateTask = (id: string, status: string) =>
  api.put(`/tasks/${id}`, { status });

export const deleteTask = (id: string) =>
  api.delete(`/tasks/${id}`);
