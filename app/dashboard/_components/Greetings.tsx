import React from 'react'
import { CircleHelp } from 'lucide-react';
import useAuth from '@/hooks/useAuth';

interface greetingMsgProps {
  greetingMessage: string
}


const Greetings = ({greetingMessage}: greetingMsgProps) => {
  const { user, logout } = useAuth();
  return (
    <div className='flex justify-between w-full items-center'>
      <div className='text-5xl font-semibold'>
      {greetingMessage}, {user?.name}!
      </div>

      <div className='flex items-center gap-2 cursor-pointer'>
        <span>Help & feedback</span>
        <CircleHelp strokeWidth={1.5}/>
      </div>
    </div>
  )
}

export default Greetings