import { api } from "./api";

export const getDashboardSummary = async () => {
  return api.get("/analytics/summary", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const getWeeklyTimeAnalytics = async () => {
  return api.get("/analytics/weekly-time", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const getTodayTime = async () => {
  return api.get("/analytics/today-time", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const getHeatmap = async () => {
  return api.get("/analytics/heatmap", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const getStreak = async () => {
  return api.get("/analytics/streak", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};