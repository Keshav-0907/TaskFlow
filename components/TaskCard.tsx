"use client";
import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import TaskModal from "./TaskModal";

interface TaskCardProps {
  task: {
    _id: string;
    title: string;
    description: string;
    priority: string;
    deadline: string;
    createdAt: string;
  };
  index: number;
  onClick: (taskId: string) => void;
  selectedTaskId: string;
  setSelectedTaskId: (taskId: string) => void;
}

const TaskCard = ({
  task,
  index,
  onClick,
  selectedTaskId,
  setSelectedTaskId,
}: TaskCardProps) => {
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id: task._id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleTaskClick = (taskId: string) => {
    setSelectedTaskId(taskId);
    setOpenTaskModal(true);
  };

  const TaskPriority = () => {
    const getPriorityClass = (priority: any) => {
      switch (priority) {
        case 'Urgent':
          return 'bg-red-500';
        case 'Medium':
          return 'bg-yellow-500';
        case 'Low':
          return 'bg-green-500';
        default:
          return 'bg-gray-500';
      }
    };

    return (
      <div
        className={`py-[6px] px-2 rounded-lg w-fit text-white ${getPriorityClass(task.priority)}`}
      >
        {task.priority}
      </div>
    );
  };

  return (
    <>
      <div
        ref={drag as any}
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
          {task.priority && <TaskPriority />}
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
      <div
        className={`fixed top-0 right-0 h-screen bg-white transform transition-transform duration-300 ${
          openTaskModal ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ width: "670px" }}
      >
        {openTaskModal && selectedTaskId && (
          <TaskModal
            mode="edit"
            setOpenTaskModal={setOpenTaskModal}
            openTaskModal={openTaskModal}
            taskId={selectedTaskId}
            setSelectedTaskId={setSelectedTaskId}
          />
        )}
      </div>
    </>
  );
};

export default TaskCard;
