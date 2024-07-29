import React, { useEffect, useState } from "react";
import {
  X,
  MoveDiagonal2,
  Share2,
  Star,
  Loader,
  ShieldAlert,
  Calendar,
  Pencil,
  Plus,
} from "lucide-react";
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";

const statusData = [
  {
    title: "Not selected",
    value: "notSelected",
  },
  {
    title: "To Do",
    value: "todo",
  },
  {
    title: "In progress",
    value: "inProgress",
  },
  {
    title: "Under review",
    value: "underReview",
  },
  {
    title: "Finished",
    value: "finished",
  },
];

interface TaskModalProps {
  setOpenTaskModal: (open: boolean) => void;
  openTaskModal: boolean;
  setTaskStatus?: (status: string) => void;
  taskStatus?: string;
  taskId?: string;
}

const TaskModal: React.FC<TaskModalProps> = ({
  setOpenTaskModal,
  openTaskModal,
  setTaskStatus,
  taskStatus,
  taskId,
}) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("");
  const { user } = useAuth();

  const HandleSaveTask = async () => {
    try {
      const res = await axios.post("/api/tasks/createTask", {
        title: taskTitle,
        description: taskDescription,
        priority: taskPriority,
        deadline: taskDeadline,
        status: taskStatus,
        createdBy: user?._id,
      });
      console.log(res);
      return res;
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const HandleCloseAndSave = async () => {
    if (!taskTitle || !taskDescription) {
      setOpenTaskModal(false);
      return toast.error("Task Not Saved Title & Description are Mandatory Fields");
      
    }
    await HandleSaveTask();
    setOpenTaskModal(false);
    toast.success("Task Saved Succesfully");
    
  };

  useEffect(() => {});

  return (
    <div className="h-screen bg-white px-6 py-4 shadow-lg">
      <div>
        <div className="flex justify-between text-[#797979]">
          <div className="flex gap-4">
            <X className="cursor-pointer" onClick={HandleCloseAndSave} />
            <MoveDiagonal2 className="cursor-pointer" />
          </div>

          <div className="flex gap-4">
            <div className="flex bg-[#F4F4F4] p-2 rounded-[4px] gap-[14px] cursor-pointer">
              Share <Share2 />
            </div>
            <div className="flex bg-[#F4F4F4] p-2 rounded-[4px] gap-[14px] cursor-pointer">
              Favorite <Star />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[38px]">
          <div className="flex flex-col gap-8">
            <input
              placeholder="Title"
              onChange={(e) => setTaskTitle(e.target.value)}
              value={taskTitle}
              className="text-5xl font-semibold text-[#797979] focus:outline-none"
            />
            <div className="flex gap-[60px] text-[#797979]">
              <div className="flex flex-col gap-8">
                <div className="flex gap-6 items-center">
                  <Loader size={24} strokeWidth={1.2} /> Status
                </div>
                <div className="flex gap-6 items-center">
                  <ShieldAlert size={24} strokeWidth={1.2} /> Priority
                </div>
                <div className="flex gap-6 items-center">
                  <Calendar size={24} strokeWidth={1.2} /> Deadline
                </div>
                <div className="flex gap-6 items-center">
                  <Pencil size={24} strokeWidth={1.2} /> Description
                </div>
              </div>

              <div className="flex flex-col gap-8">
                <div>
                  <select
                    name="status"
                    onChange={(e) => setTaskStatus(e.target.value)}
                    className="cursor-pointer"
                    value={taskStatus}
                  >
                    {statusData.map((item, index) => (
                      <option key={index} value={item.value}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <select
                    name="priority"
                    onChange={(e) => setTaskPriority(e.target.value)}
                    className="cursor-pointer"
                    value={taskPriority}
                  >
                    <option value="">Select priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <input
                    type="date"
                    onChange={(e) => setTaskDeadline(e.target.value)}
                    value={taskDeadline}
                    className="cursor-pointer"
                  />
                </div>
                <div>
                  <input
                    placeholder="Description"
                    onChange={(e) => setTaskDescription(e.target.value)}
                    value={taskDescription}
                    className="w-full flex items-center focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-[23px] cursor-pointer">
            <Plus /> Add custom property
          </div>
        </div>
      </div>

      <div className="h-[1px] my-[32px] w-full bg-[#DEDEDE]"></div>

      <div className="text-[#C0BDBD]">
        Start writing, or drag your own files here.
      </div>
    </div>
  );
};

export default TaskModal;
