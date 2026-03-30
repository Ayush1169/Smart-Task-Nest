// src/services/time.service.ts
import { api } from "./api";

export const saveTime = (taskId: string, duration: number) =>
  api.post("/time/save", { taskId, duration });
