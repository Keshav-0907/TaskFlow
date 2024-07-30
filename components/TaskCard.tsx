import React, { useState } from "react";
import { Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import TaskModal from "./TaskModal";

const TaskCard = ({ tasks, selectedTaskId, setSelectedTaskId }) => {
  const [openTaskModal, setOpenTaskModal] = useState(false);

  const handleTaskClick = (taskId) => {
    setSelectedTaskId(taskId);
    setOpenTaskModal(true);
  };

  return (
    <>
      {tasks.map((task, index) => (
        <div key={index}>
          <div
            onClick={() => handleTaskClick(task._id)}
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
              {formatDistanceToNow(new Date(task.createdAt))}
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
        </div>
      ))}
    </>
  );
};

export default TaskCard;
