import Cookies from "js-cookie";
import { api } from "./api";
import path from "path";

export const signup = (data: any) =>
  api.post("/auth/signup", data);

export const login = async (data: any) => {
  const res = await api.post("/auth/login", data);

  // ✅ SAVE TOKEN IN COOKIE
  Cookies.set("token", res.data.token, {
    expires: 1, // 1 day
    path: "/",
    sameSite: "lax",
  });

  // optional: save user info
  Cookies.set("user", JSON.stringify(res.data.user), {
    expires: 1,
    path: "/",
  })

  return res;
};

export const forgotPassword = (email: string) =>
  api.post("/auth/forgot-password", { email });

export const verifyOtp = (data: any) =>
  api.post("/auth/verify-otp", data);

export const resetPassword = (data: any) =>
  api.post("/auth/reset-password", data);
