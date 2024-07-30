"use client";
import React from "react";
import { useDrag } from "react-dnd";
import { Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import TaskModal from "./TaskModal";
import { useState } from "react";

const TaskCard = ({
  task,
  index,
  onClick,
  selectedTaskId,
  setSelectedTaskId,
}) => {
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id: task._id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleTaskClick = (taskId) => {
    setSelectedTaskId(taskId);
    console.log('here')
    setOpenTaskModal(true);
  };

  console.log(openTaskModal)

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      onClick={() => {
        onClick(task._id);
        handleTaskClick(task._id);
      }}
      className="py-[14px] cursor-pointer hover:bg-slate-100 px-[13px] bg-[#F9F9F9] border-[1px] border-[#DEDEDE] flex flex-col gap-4 rounded-lg"
    >
      <div className="flex flex-col gap-[13px]">
        <div className="flex flex-col gap-1">
          <div className="text-[#606060] font-medium">{task?.title}</div>
          <div className="text-[#797979] text-sm">{task?.description}</div>
        </div>
        {task.priority && (
          <div
            className={`py-[6px] px-2 rounded-lg w-fit text-white ${
              task.priority === "urgent"
                ? "bg-red-500"
                : task.priority === "medium"
                ? "bg-yellow-500"
                : "bg-green-500"
            }`}
          >
            {task.priority}
          </div>
        )}
        {task.deadline && (
          <div className="flex gap-2 text-sm text-[#606060]">
            <Clock className="text-[#606060]" size={20} /> {task.deadline}
          </div>
        )}
      </div>

      <div className="text-sm font-medium text-[#797979]">
        {formatDistanceToNow(new Date(task.createdAt))} ago
      </div>
    </div>
  );
};

export default TaskCard;
