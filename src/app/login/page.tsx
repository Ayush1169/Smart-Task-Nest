"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { login, signup } from "@/services/auth.service";

export default function LoginPage() {
  // login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const router = useRouter();

  // signup state
  const [name, setName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

const handleLogin = async () => {
  try {
    await login({
      email: loginEmail,
      password: loginPassword,
    });

    alert("Login Successful ✅");
    router.replace("/dashboard"); // replace > push (better)

  } catch (err: any) {
    alert(err.response?.data?.message || "Login failed");
  }
};


  

  const handleSignup = async () => {
    try {
      await signup({
        name,
        email: signupEmail,
        password: signupPassword,
      });
      alert("Signup Successful ✅");
    } catch (err: any) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">

        {/* LOGIN */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl text-black font-semibold mb-2">Login</h2>
          <p className="text-sm text-gray-500 mb-6">
            Access your Smart Task Nest account
          </p>

          <div className="flex flex-col text-black gap-4">
            <Input
              label="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <Input
              label="Password"
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <Button text="Login" onClick={handleLogin} />
          </div>
        </div>

        {/* SIGNUP */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-black mb-2">Signup</h2>
          <p className="text-sm text-gray-500 mb-6">
            Create a new Smart Task Nest account
          </p>

          <div className="flex flex-col text-black gap-4">
            <Input
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label="Email"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
            />
            <Input
              label="Password"
              type="password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
            />
            <Button text="Sign Up" onClick={handleSignup} />
          </div>
        </div>

      </div>
    </div>
  );
}
