import React from "react";
import {
  Search,
  Calendar,
  Sparkles,
  Filter,
  Share2,
  PlusCircle,
} from "lucide-react";

interface MenuOption {
  title: string;
  icon: React.ReactNode;
}

interface MenuBarProps {
  setOpenTaskModal: (open: boolean) => void;
  setTaskStatus: any
}

const MenuBarOpts: MenuOption[] = [
  {
    title: `Calendar\u00A0View`,
    icon: <Calendar strokeWidth={1.2} size={20} />,
  },
  {
    title: "Automation",
    icon: <Sparkles strokeWidth={1.2} size={20} />,
  },
  {
    title: "Filter",
    icon: <Filter strokeWidth={1.2} size={20} />,
  },
  {
    title: "Share",
    icon: <Share2 strokeWidth={1.2} size={20} />,
  },
];

const MenuBar: React.FC<MenuBarProps> = ({
  setOpenTaskModal,
  setTaskStatus,
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="bg-[#FFF] border-[1px] border-[#E9E9E9] flex w-fit p-2 items-center rounded-lg">
        <input placeholder="Search" className="focus:outline-none" />
        <Search className="text-[#797979]" />
      </div>

      <div className="flex gap-4">
        <div className="flex items-center text-[#797979] gap-4">
          {MenuBarOpts.map((opt, index) => (
            <div
              key={index}
              className="flex gap-[14px] items-center cursor-pointer"
            >
              <span>{opt.title}</span>
              {opt.icon}
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            setTaskStatus("");
            setOpenTaskModal(true);
          }}
          className="bg-gradient-to-b flex p-2 text-white gap-2 rounded-lg justify-center items-center text-xl from-[#4C38C2] to-[#2F2188] border-[1px] border-[#4B36CC] w-full"
        >
          <span>Create new</span>
          <PlusCircle />
        </button>
      </div>
    </div>
  );
};

export default MenuBar;
