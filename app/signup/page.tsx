"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Eye, EyeOff, ShieldAlert } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";

const LoaderOverlay: React.FC = () => (
  <div className="fixed inset-0 bg-white bg-opacity-60 backdrop-blur-lg flex justify-center items-center z-50">
    <div className="w-12 h-12 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
  </div>
);

const Signup: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passVisible, setPassVisible] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    setShowError(false);
    setEmailError(null);

    if (!name || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post("/api/user/createuser", {
        name,
        email,
        password,
      });
      console.log(res);
      if (res.data.status === 200) {
        toast.success("SignUp Successful");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      }

      if (res.data.status === 400) {
        setShowError(true);
      }
    } catch (error) {
      setShowError(true);
      console.error("Error creating user:", error);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="bg-gradient-to-b from-white to-[#AFA3FF] h-screen flex justify-center items-center relative">
      {isLoading && <LoaderOverlay />}
      <div className="p-[60px] bg-white rounded-2xl border-[1px] border-[#CECECE] flex flex-col gap-8 z-10">
        <div className="text-5xl font-semibold flex">
          Welcome to <span className="text-[#4534AC]">Workflow</span> !
        </div>
        <div className="flex flex-col gap-[22px]">
          <div className="flex flex-col gap-6">
            <input
              className="bg-[#EBEBEB] rounded-lg py-4 px-3 focus:outline-none text-[#606060]"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <input
              className="bg-[#EBEBEB] rounded-lg py-4 px-3 focus:outline-none text-[#606060]"
              placeholder="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            {emailError && (
              <div className="text-red-500 flex items-center gap-2">
                <ShieldAlert />
                {emailError}
              </div>
            )}
            {showError && (
              <div className="text-red-500 flex items-center gap-2">
                <ShieldAlert />
                This Email is already Registered
              </div>
            )}
            <div className="bg-[#EBEBEB] rounded-lg py-4 px-3 flex justify-between text-[#606060]">
              <input
                className="w-full bg-[#EBEBEB] focus:outline-none"
                placeholder="Password"
                type={passVisible ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button
                onClick={() => setPassVisible(!passVisible)}
                className="flex items-center"
              >
                {passVisible ? <EyeOff size={24} /> : <Eye size={24} />}
              </button>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="bg-button-gradient text-white px-2 py-3 rounded-lg border-[1px]"
          >
            Sign up
          </button>
        </div>
        <div className="text-center text-xl text-[#606060]">
          Already have an account?{" "}
          <Link className="text-[#0054A1]" href={"/login"}>
            Log In
          </Link>{" "}
        </div>
      </div>
    </div>
  );
};

export default Signup;
