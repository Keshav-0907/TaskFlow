import React from "react";
import { Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const TaskCard = ({ tasks }) => {
  return (
    <>
      <div className="py-[14px] cursor-pointer hover:bg-slate-100 px-[13px] bg-[#F9F9F9] border-[1px] border-[#DEDEDE] flex flex-col gap-4 rounded-lg">
        <div className="flex flex-col gap-[13px]">
          <div className="flex flex-col gap-1">
            <div className="text-[#606060] font-medium">{tasks?.title}</div>
            <div className="text-[#797979] text-sm">{tasks?.description}</div>
          </div>
          {tasks.priority && (
            <div
              className={`py-[6px] px-2 rounded-lg w-fit text-white ${
                tasks.priority === "urgent"
                  ? "bg-red-500"
                  : tasks.priority === "medium"
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
            >
              {tasks.priority}
            </div>
          )}
          {tasks.deadline && (
            <div className="flex gap-2 text-sm text-[#606060]">
              <Clock className="text-[#606060]" size={20} /> {tasks.deadline}
            </div>
          )}
        </div>

        <div className="text-sm font-medium text-[#797979]">
          {formatDistanceToNow(new Date(tasks.createdAt))}
        </div>
      </div>
    </>
  );
};

export default TaskCard;
