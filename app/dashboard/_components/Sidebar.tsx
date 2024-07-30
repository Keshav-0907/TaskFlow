"use client";
import React, { useState } from "react";
import {
  BellDot,
  Loader,
  ChevronsRight,
  CirclePlus,
  PlusCircle,
  ArrowDownToLine,
} from "lucide-react";
import HomeIcon from "@/components/customIcons/HomeIcon";
import BoardIcon from "@/components/customIcons/BoardIcon";
import SettingsIcon from "@/components/customIcons/SettingsIcon";
import TeamsIcon from "@/components/customIcons/TeamsIcon";
import AnalyticsIcon from "@/components/customIcons/AnalyticsIcon";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";

const SideBarItems = [
  {
    title: "Home",
    icon: <HomeIcon />,
    value: "home",
  },
  {
    title: "Board",
    icon: <BoardIcon />,
    value: "board",
  },
  {
    title: "Teams",
    icon: <TeamsIcon />,
    value: "teams",
  },
  {
    title: "Analytics",
    icon: <AnalyticsIcon />,
    value: "analytics",
  },
  {
    title: "Settings",
    icon: <SettingsIcon />,
    value: "settings",
  },
];

const Sidebar = ({
  setOpenTaskModal,
  openTaskModal,
  setTaskStatus,
  setIsSidebarOpen,
  isSidebarOpen,
}) => {
  const { user, logout } = useAuth();
  const [activeItem, setActiveItem] = useState("home");

  const handleItemClick = (value: React.SetStateAction<string>) => {
    setActiveItem(value);
  };
  
  const handleLogout = () =>{
    toast.success('Logged Out')
    logout();

  }

  return (
    <div className={`w-[285px] pt-6 px-4 pb-8 border-e-[1px] border-[#DEDEDE] h-screen flex flex-col justify-between bg-[#FFF]`}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <img
              className="w-8 h-8 rounded-lg"
              src="https://github.com/shadcn.png"
              alt="User"
            />
            <div className="text-xl font-medium">{user.name}</div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-5">
              <BellDot
                strokeWidth={1.5}
                className="text-[#666666] cursor-pointer"
              />
              <Loader
                strokeWidth={1.5}
                className="text-[#666666] cursor-pointer"
              />
              <ChevronsRight
                strokeWidth={1.5}
                className="text-[#666666] cursor-pointer"
              />
            </div>
            <button
              onClick={handleLogout}
              className="p-2 bg-[#F4F4F4] rounded-[4px] text-[#797979]"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {SideBarItems.map((item, index) => (
            <div
              key={index}
              className={`flex gap-4 items-center cursor-pointer px-2 ${
                activeItem === item.value
                  ? "border-[1px] border-[#DDD] bg-[#F4F4F4]  py-2 rounded-[4px]"
                  : "py-1"
              }`}
              onClick={() => handleItemClick(item.value)}
            >
              <div className="w-8 h-8 flex items-center">{item.icon}</div>
              <div
                className={`text-[#666666] ${
                  activeItem === item.value ? "font-semibold" : ""
                }`}
              >
                {item.title}
              </div>
            </div>
          ))}
        </div>

        <div>
          <button
            onClick={() => {
              setTaskStatus("");
              setOpenTaskModal(true);
            }}
            className="bg-gradient-to-b flex p-2 text-white gap-2 rounded-lg justify-center items-center text-xl from-[#4C38C2] to-[#2F2188] border-[1px] border-[#4B36CC] w-full"
          >
            <span>Create new task</span>
            <PlusCircle />
          </button>
        </div>
      </div>

      <div className="flex gap-2 items-center text-[#666666] bg-[#F3F3F3] p-2 rounded-lg cursor-pointer">
        <ArrowDownToLine size={40} strokeWidth={1.5} />
        <div className="flex flex-col gap-1">
          <span className="">Download the app</span>
          <span className="text-[14px]">Get the full experience</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
