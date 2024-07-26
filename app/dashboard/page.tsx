import React from "react";
import Sidebar from "./_components/Sidebar";
import Greetings from "./_components/Greetings";
import Features from "./_components/Features";
import MenuBar from "./_components/MenuBar";

const Dashboard = () => {
  return (
    <div className="flex ">
      <div className="w-[285px]">
        <Sidebar />
      </div>
      <div className="py-6 px-4 flex flex-col gap-4 w-full bg-[#F7F7F7]">
        <Greetings />
        <Features />
        <MenuBar />
        <div>
          Main
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
