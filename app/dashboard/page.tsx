"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "./_components/Sidebar";
import Greetings from "./_components/Greetings";
import Features from "./_components/Features";
import MenuBar from "./_components/MenuBar";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import TaskModal from "@/components/TaskModal";
import Board from "./_components/Board";
import Loader from "@/components/Loader";

const Dashboard = () => {
  const { user, isLoading } = useAuth();
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [taskStatus, setTaskStatus] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return <Loader />;
  }

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "Good Morning";
    } else if (currentHour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };
  const greetingMessage = getGreeting();

  console.log('first', openTaskModal)

  return (
    <div className="flex w-screen">
      <div className="fixed">
        <Sidebar
          setOpenTaskModal={setOpenTaskModal}
          openTaskModal={openTaskModal}
          setTaskStatus={setTaskStatus}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>
      <div className="py-6 pl-[300px] pr-4 flex overflow-y-auto flex-col gap-4 h-screen w-full bg-[#F7F7F7]">
        <Greetings greetingMessage={greetingMessage} />
        <Features />
        <MenuBar setOpenTaskModal={setOpenTaskModal} setTaskStatus={setTaskStatus} />
        <Board
          setOpenTaskModal={setOpenTaskModal}
          setTaskStatus={setTaskStatus}
          taskStatus={taskStatus}
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
          setTaskStatus={''}
          taskStatus={taskStatus}
          mode="add"
        />
      </div>
    </div>
  );
};

export default Dashboard;
