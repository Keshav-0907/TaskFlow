"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const isUser = user

  useEffect(() => {
    if (isUser?.name) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, []);

  return <div>Hello</div>;
}
