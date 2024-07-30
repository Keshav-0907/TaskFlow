"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

const LoaderOverlay: React.FC = () => (
  <div className="fixed inset-0 bg-white bg-opacity-60 backdrop-blur-lg flex justify-center items-center z-50">
    <div className="w-12 h-12 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
  </div>
);

const Login: React.FC = () => {
  const { login, user, isLoading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passVisible, setPassVisible] = useState<boolean>(false);

  console.log('isLoading', isLoading);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }) as any;
      if (res.status === 200) {
        toast.success('Logged In');
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
    <div className="bg-gradient-to-b from-white to-[#AFA3FF] h-screen flex justify-center items-center relative">
      {isLoading && <LoaderOverlay />}
      <div className="p-[60px] bg-white rounded-2xl border-[1px] border-[#CECECE] flex flex-col gap-8 z-10">
        <div className="text-5xl font-semibold flex">
        Welcome to <span className="text-[#4534AC]">Workflow</span> !
        </div>
        <form className="flex flex-col gap-[22px]" onSubmit={handleLogin}>
          <div className="flex flex-col gap-6">
            <input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="bg-[#EBEBEB] rounded-lg py-4 px-3 focus:outline-none text-[#606060]"
              type="email"
              required
            />
            <div className="relative">
              <input
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="bg-[#EBEBEB] rounded-lg py-4 px-3 focus:outline-none text-[#606060] w-full"
                type={passVisible ? "text" : "password"}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => setPassVisible(!passVisible)}
              >
                {passVisible ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="bg-button-gradient text-white px-2 py-3 rounded-lg border-[1px]"
          >
            Login
          </button>
        </form>
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
