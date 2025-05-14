import React from 'react'

import { usePomodoroContext } from '../../../../hooks/pomodoro/pomodoroContext'
import { PomodoroSettings } from '../../../../types'
import SessionPicker from './Elements/SessionPicker'
import {Zap,Hourglass,Coffee,Plus} from 'lucide-react'
function SessionCategoryPicker() {
  const {customSessions,openCustomSessionModal} =usePomodoroContext();
  return (
    <>
    <div className="w-full h-[20%] flex flex-row gap-x-5 overflow-x-auto scroll-smooth pb-4">
    <SessionPicker 
      icon={<Zap />} 
      label="chill" 
      workDuration={20} 
      sessionCount={3} 
      shortBreak={3} 
      longBreak={10} 
    />
    <SessionPicker 
      icon={<Hourglass />} 
      label="dev" 
      workDuration={3} 
      sessionCount={3} 
      shortBreak={1} 
      longBreak={2} 
    />
    <SessionPicker  
      icon={<Coffee />} 
      label="classic" 
      workDuration={25} 
      sessionCount={5} 
      shortBreak={5} 
      longBreak={15} 
    />
    {customSessions.map((item)=>(
       <SessionPicker  
       icon={<Coffee />} 
       label={item.label} 
       workDuration={item.workDuration} 
       sessionCount={item.sessionCount} 
       shortBreak={item.shortBreak} 
       longBreak={item.longBreak} 
     />
    ))}
    <button
      className="flex flex-col items-center justify-center rounded-xl w-[80px] min-w-[72px] h-full
               border-2 border-dashed transition-all duration-300 ease-in-out group hover:bg-[#B5D3C3]"
      style={{
        borderColor: '#A3C4A8',
        backgroundColor: '#F7FAF8',
        color: '#6B8F72',
      }}
      onClick={openCustomSessionModal}
      title="Add session"
    >
      <Plus
        className="w-6 h-6 text-inherit transition-all duration-300 ease-in-out"
      />
    </button>
  </div>
  
 
  </>
  )
}

export default SessionCategoryPicker