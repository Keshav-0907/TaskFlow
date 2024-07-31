'use client'; 
import React, { createContext, useContext, useState } from 'react';

interface TaskContextProps {
  selectedTaskId: string;
  setSelectedTaskId: (taskId: string) => void;
  openTaskModal: boolean;
  setOpenTaskModal: (isOpen: boolean) => void;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedTaskId, setSelectedTaskId] = useState<string>('');
  const [openTaskModal, setOpenTaskModal] = useState<boolean>(false);

  return (
    <TaskContext.Provider
      value={{ selectedTaskId, setSelectedTaskId, openTaskModal, setOpenTaskModal }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
