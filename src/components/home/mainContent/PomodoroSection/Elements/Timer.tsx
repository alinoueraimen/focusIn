import React, { useEffect, useState } from 'react'
import useUtils from '../../../../../utils/useUtils'
import { usePomodoroContext } from '../../../../../hooks/pomodoro/pomodoroContext';

interface PomodoroTimerPropsType{
    timeLeft: number
}

function PomodoroTimer({timeLeft} : PomodoroTimerPropsType) {
    const [text,setText] = useState<string>("start a session");
    const {initialWorkTime,initialBreakTime,isWorking,currentCondition,isRunning,isFinished} = usePomodoroContext();
    const {formatTime} = useUtils();
useEffect(() => {
  if(!isFinished){
    if(isRunning){
      setText("⌛ Timer Running...")
      switch (true) {
          case currentCondition.isQuarterTime:
            console.log("💡 Quarter Time Reached");
            setText("💡 Quarter Time Reached")
            break;
      
          case currentCondition.isHalfTime:
            console.log("🔔 Half Time Reached");
            setText("🔔 Half Time Reached")
            break;
      
          case currentCondition.isQuarterBreakTime:
            console.log("☕ Quarter Break Time");
            setText("☕ Quarter Break Time")
            break;
      
          default:
            console.log("⌛ Timer Running...");
            setText("⌛ Timer Running...")
            break;
        }
  }else{
      setText('start timer')
    }
  }else{
    setText('finished ')
  }
  
  
}, [currentCondition]);
  return (
    <>
    <div className='h-fit aspect-square relative'>
        <svg viewBox='0 0 100 100' className="w-full h-full">
            <circle 
            cx="50"
            cy="50"
            r="45"
            stroke='#D9D9D9'
            strokeWidth="8"
            fill='none'
            />
            <circle 
            cx="50"
            cy="50"
            r="45"
            stroke='#A3C4A8'
            strokeWidth="10"
            fill='none'
            strokeLinecap='round'
            strokeDasharray={
                `${2*Math.PI * 45}`
            }
            strokeDashoffset={`${
               2*Math.PI *45*( 1 - timeLeft/(isWorking ? initialWorkTime : initialBreakTime) ) 
            }`}
            />
        </svg>
        <div className=' flex flex-col justify-center items-center absolute inset-0
        '>
            <h1 className='text-text font-semibold text-[40px]'>{formatTime(timeLeft)}</h1>
            <p className='text-text font-normal'>{text}</p>
        </div>
    </div> 

    </>
  )
}

export default PomodoroTimer