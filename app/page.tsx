"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const isUser = user;

  useEffect(() => {
    if (isUser?.name) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, []);

  return (
    <div className="bg-gradient-to-b from-white to-[#AFA3FF] h-screen flex justify-center items-center">
      {isUser?.name ? (
        <button className="bg-button-gradient text-white px-2 py-3 rounded-lg border-[1px]">
          <Link href={"/dashboard"}>Go to Dashboard</Link>
        </button>
      ) : (
        <button className="bg-button-gradient text-white px-2 py-3 rounded-lg border-[1px]">
          <Link href={"/login"}>Login Now</Link>
        </button>
      )}
    </div>
  );
}
