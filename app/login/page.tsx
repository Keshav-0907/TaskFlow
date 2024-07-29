"use client";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Login = () => {
  const { login, user } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      console.log(res.status);
      if (res.status === 200) {
        toast.success('Logged In')
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  return (
    <div className="bg-gradient-to-b from-white to-[#AFA3FF] h-screen flex justify-center items-center">
      <div className="p-[60px] bg-white rounded-2xl border-[1px] border-[#CECECE] flex flex-col gap-8">
        <div className="text-5xl font-semibold flex">Welcome to Workflow !</div>
        <div className="flex flex-col gap-[22px]">
          <div className="flex flex-col gap-6">
            <input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="bg-[#EBEBEB] rounded-lg py-4 px-3 focus:outline-none text-[#606060]"
            />
            <input
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="bg-[#EBEBEB] rounded-lg py-4 px-3 focus:outline-none text-[#606060]"
            />
          </div>
          {/* FIX */}
          <button
            onClick={handleLogin}
            className="bg-button-gradient text-white px-2 py-3 rounded-lg border-[1px]"
          >
            Login
          </button>
        </div>
        <div className="text-center text-xl text-[#606060]">
          Don’t have an account? Create a{" "}
          <Link className="text-[#0054A1]" href={"/signup"}>
            new account.
          </Link>{" "}
        </div>
      </div>
    </div>
  );
};

export default Login;
