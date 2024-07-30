"use client";
import React, { useState } from "react";
import Sidebar from "./_components/Sidebar";
import Greetings from "./_components/Greetings";
import Features from "./_components/Features";
import MenuBar from "./_components/MenuBar";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import TaskModal from "@/components/TaskModal";
import Board from "./_components/Board";

const Dashboard = () => {
  const { user, isLoading } = useAuth();
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [taskStatus, setTaskStatus] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const router = useRouter();

  // console.log(isLoading);
  // console.log("OTM", openTaskModal);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null; // or some fallback UI
  }
  return (
    <div className="flex w-screen">
      <div className="fixed">
        <Sidebar
          setOpenTaskModal={setOpenTaskModal}
          openTaskModal={openTaskModal}
          setTaskStatus={setTaskStatus}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          // taskStatus={taskStatus}
        />
      </div>
      <div className="py-6 pl-[300px] pr-4 flex overflow-y-auto flex-col gap-4 h-screen w-full bg-[#F7F7F7]">
        <Greetings />
        <Features />
        <MenuBar setOpenTaskModal={setOpenTaskModal} />
        <Board
          setOpenTaskModal={setOpenTaskModal}
          setTaskStatus={setTaskStatus}
          openTaskModal={openTaskModal}
        />
      </div>

      <div
        className={`fixed top-0 right-0 h-screen bg-white transform transition-transform duration-300 ${
          openTaskModal ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ width: "670px" }}
      >
        <TaskModal
          setOpenTaskModal={setOpenTaskModal}
          openTaskModal={openTaskModal}
          setTaskStatus={setTaskStatus}
          taskStatus={taskStatus}
          mode='add'
        />
      </div>
    </div>
  );
};

export default Dashboard;
