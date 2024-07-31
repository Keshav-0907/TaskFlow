"use client";
import React, { useEffect, useState, useCallback } from "react";
import { ListFilter, Plus } from "lucide-react";
import { useDrop } from "react-dnd";
import TaskCard from "@/components/TaskCard";
import useAuth from "@/hooks/useAuth";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import NoTasks from "@/components/customIcons/NoTasks";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  deadline: string;
}

interface BoardProps {
  setOpenTaskModal: (open: boolean) => void;
  setTaskStatus: (status: string) => void;
  openTaskModal: boolean;
  taskStatus:any
}

interface ColumnProps {
  title: string;
  tasks: Task[];
  status: string;
}

interface DropItem {
  id: string;
}

const Board: React.FC<BoardProps> = ({
  setOpenTaskModal,
  setTaskStatus,
  taskStatus,
  openTaskModal,
}) => {
  const [userTasks, setUserTasks] = useState<Task[]>([]);
  const { user } = useAuth();
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  useEffect(() => {
    const getTask = async () => {
      if (!user?._id) return;
      try {
        const res = await fetch("/api/tasks/getUserTask", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userID: user._id }),
        });
        const data = await res.json();
        setUserTasks(data || []);
        
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };
    getTask();
  }, [selectedTaskId, user?._id, openTaskModal]);

  const handleTaskDrop = useCallback((taskId: string, status: string) => {
    setUserTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task._id === taskId ? { ...task, status } : task
      );
      fetch("/api/tasks/updateTaskStatus", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskId, status }),
      }).catch((error) =>
        console.error("Failed to update task status:", error)
      );
      return updatedTasks;
    });
  }, []);

  const todoTasks = userTasks.filter((task) => task.status === "todo");
  const inProgressTasks = userTasks.filter(
    (task) => task.status === "inProgress"
  );
  const underReviewTasks = userTasks.filter(
    (task) => task.status === "underReview"
  );
  const finishedTasks = userTasks.filter((task) => task.status === "finished");

  const Column: React.FC<ColumnProps> = ({ title, tasks, status }) => {
    const [{ isOver }, drop] = useDrop<DropItem, void, { isOver: boolean }>({
      accept: "TASK",
      drop: (item) => handleTaskDrop(item.id, status),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    });

    return (
      <div
        ref={drop as any}
        className={`text-[#555555] flex flex-col gap-4 ${
          isOver ? "bg-gray-100" : ""
        }`}
      >
        <div className="flex justify-between items-center">
          <span>{title}</span>
          <ListFilter />
        </div>
        <div className="flex flex-col gap-3">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskCard
                key={task._id}
                setTaskStatus={setTaskStatus}
                taskStatus={taskStatus}
                task={task as any}
                onClick={() => setSelectedTaskId(task._id)}
                selectedTaskId={selectedTaskId as any}
                index={undefined as any}
                setSelectedTaskId={setSelectedTaskId as any}
              />
            ))
          ) : (
            <div className="flex justify-center text-gray-600">
              No tasks available.
            </div>
          )}
        </div>
        <button
          onClick={() => {
            setTaskStatus(status);
            setOpenTaskModal(true);
          }}
          className="bg-gradient-to-b from-[#3A3A3A] to-[#202020] text-white flex justify-between w-full p-2 rounded-lg"
        >
          Add new <Plus />
        </button>
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-4 bg-white p-4 h-fit gap-4">
        <Column title="To do" tasks={todoTasks} status="todo" />
        <Column
          title="In progress"
          tasks={inProgressTasks}
          status="inProgress"
        />
        <Column
          title="Under review"
          tasks={underReviewTasks}
          status="underReview"
        />
        <Column title="Finished" tasks={finishedTasks} status="finished" />
      </div>
    </DndProvider>
  );
};

export default Board;
