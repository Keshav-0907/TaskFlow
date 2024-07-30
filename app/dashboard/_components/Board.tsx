'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { ListFilter, Plus } from 'lucide-react';
import { useDrag, useDrop } from 'react-dnd';
import TaskCard from '@/components/TaskCard';
import useAuth from '@/hooks/useAuth';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Board = ({ setOpenTaskModal, setTaskStatus, openTaskModal }) => {
  const [userTasks, setUserTasks] = useState([]);
  const { user } = useAuth();
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  useEffect(() => {
    const getTask = async () => {
      const res = await fetch('/api/tasks/getUserTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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

  const handleTaskDrop = useCallback((taskId, status) => {
    setUserTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task._id === taskId ? { ...task, status } : task
      );
      fetch('/api/tasks/updateTaskStatus', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskId, status }),
      });
      return updatedTasks;
    });
  }, []);

  const todoTasks = userTasks.filter((task) => task.status === 'todo');
  const inProgressTasks = userTasks.filter((task) => task.status === 'inProgress');
  const underReviewTasks = userTasks.filter((task) => task.status === 'underReview');
  const finishedTasks = userTasks.filter((task) => task.status === 'finished');

  const Column = ({ title, tasks, status }) => {
    const [{ isOver }, drop] = useDrop({
      accept: 'TASK',
      drop: (item) => handleTaskDrop(item.id, status),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    });

    return (
      <div
        ref={drop}
        className={`text-[#555555] flex flex-col gap-4 ${isOver ? 'bg-gray-100' : ''}`}
      >
        <div className="flex justify-between">
          {title}
          <ListFilter />
        </div>
        {tasks.map((task, index) => (
          <TaskCard
            key={task._id}
            task={task}
            index={index}
            onClick={setSelectedTaskId}
            setSelectedTaskId={setSelectedTaskId}
            selectedTaskId={selectedTaskId}

          />
        ))}
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
    <div className="grid grid-cols-4 bg-white p-4 h-full gap-4">
      <Column title="To do" tasks={todoTasks} status="todo" />
      <Column title="In progress" tasks={inProgressTasks} status="inProgress" />
      <Column title="Under review" tasks={underReviewTasks} status="underReview" />
      <Column title="Finished" tasks={finishedTasks} status="finished" />
    </div>
    </DndProvider>
  );
};

export default Board;
