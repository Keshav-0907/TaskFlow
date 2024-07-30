import React, { useEffect, useState } from "react";
import { ListFilter, Plus } from "lucide-react";
import TaskCard from "@/components/TaskCard";
import useAuth from "@/hooks/useAuth";

const Board = ({ setOpenTaskModal, setTaskStatus, openTaskModal }) => {
  const [userTasks, setUserTasks] = useState([]);
  const { user } = useAuth();
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  console.log('ss', selectedTaskId)

  useEffect(() => {
    const getTask = async () => {
      const res = await fetch("/api/tasks/getUserTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: user?._id,
        }),
      });
      const data = await res.json();
      setUserTasks(data || []);
    };
    getTask();
  }, [selectedTaskId, user?._id, openTaskModal]);

  const todoTasks = userTasks.filter((task) => task.status === "todo");
  const inProgressTasks = userTasks.filter(
    (task) => task.status === "inProgress"
  );
  const underReviewTasks = userTasks.filter(
    (task) => task.status === "underReview"
  );
  const finishedTasks = userTasks.filter((task) => task.status === "finished");

  return (
    <div className="grid grid-cols-4 bg-white p-4 h-full gap-4">
      <div className="text-[#555555] flex flex-col gap-4">
        <div className="flex justify-between">
          To do
          <ListFilter />
        </div>
        <TaskCard tasks={todoTasks} selectedTaskId={selectedTaskId} setSelectedTaskId={setSelectedTaskId}/>
        <button
          onClick={() => {
            setTaskStatus("todo");
            setOpenTaskModal(true);
          }}
          className="bg-gradient-to-b from-[#3A3A3A] to-[#202020] text-white flex justify-between w-full p-2 rounded-lg"
        >
          Add new <Plus />
        </button>
      </div>
      <div className="text-[#555555] flex flex-col gap-4">
        <div className="flex justify-between">
          In progress
          <ListFilter />
        </div>
        <TaskCard tasks={inProgressTasks}  selectedTaskId={selectedTaskId} setSelectedTaskId={setSelectedTaskId}/>
        <button
          onClick={() => {
            setTaskStatus("inProgress");
            setOpenTaskModal(true);
          }}
          className="bg-gradient-to-b from-[#3A3A3A] to-[#202020] text-white flex justify-between w-full p-2 rounded-lg"
        >
          Add new <Plus />
        </button>
      </div>
      <div className="text-[#555555] flex flex-col gap-4">
        <div className="flex justify-between">
          Under review
          <ListFilter />
        </div>
        <TaskCard tasks={underReviewTasks}  selectedTaskId={selectedTaskId} setSelectedTaskId={setSelectedTaskId}/>
        <button
          onClick={() => {
            setTaskStatus("underReview");
            setOpenTaskModal(true);
          }}
          className="bg-gradient-to-b from-[#3A3A3A] to-[#202020] text-white flex justify-between w-full p-2 rounded-lg"
        >
          Add new <Plus />
        </button>
      </div>
      <div className="text-[#555555] flex flex-col gap-4">
        <div className="flex justify-between">
          Finished
          <ListFilter />
        </div>
        <TaskCard tasks={finishedTasks}  selectedTaskId={selectedTaskId} setSelectedTaskId={setSelectedTaskId}/>
        <button
          onClick={() => {
            setTaskStatus("finished");
            setOpenTaskModal(true);
          }}
          className="bg-gradient-to-b from-[#3A3A3A] to-[#202020] text-white flex justify-between w-full p-2 rounded-lg"
        >
          Add new <Plus />
        </button>
      </div>
    </div>
  );
};

export default Board;
