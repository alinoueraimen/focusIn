import React from 'react'
import PomodoroTimer from './Elements/Timer'
import SessionDot from './Elements/SessionDot'
function TimeAndSessionSection() {

  return (
    <div className='h-[40%] 
    w-full flex flex-col gap-y-3 items-center '>
    <PomodoroTimer timeLeft={0}/>
    <div className='w-full h-fit flex justify-center gap-x-3'>
        <SessionDot/>
        <SessionDot/>
        <SessionDot/>
    </div>
    </div>
  )
}

export default TimeAndSessionSection