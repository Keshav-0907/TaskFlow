import Input from "@/components/Input";
import Link from "next/link";
import React from "react";

const Signup = () => {
  return (
    <div className="bg-gradient-to-b from-white to-[#AFA3FF] h-screen flex justify-center items-center">
      <div className="p-[60px] bg-white rounded-2xl border-[1px] border-[#CECECE] flex flex-col gap-8">
        <div className="text-5xl font-semibold flex">Welcome to Workflow !</div>
        <div className="flex flex-col gap-[22px]">
          <div className="flex flex-col gap-6">
            <Input placeholder={"name"} />
            <Input placeholder={"email"} />
            <Input placeholder={"password"} />
          </div>
          {/* FIX */}
          <button className="bg-button-gradient text-white px-2 py-3 rounded-lg border-[1px]">
            Login
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
