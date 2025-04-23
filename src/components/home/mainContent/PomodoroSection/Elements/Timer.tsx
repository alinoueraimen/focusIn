import React, { useEffect, useState } from 'react'
import { usePomodoroContext } from '../../../../../hooks/pomodoro/pomodoroContext';
import {Play,Pause,RotateCcw} from 'lucide-react'

import TimerText from './TimerText'
interface PomodoroTimerPropsType{
    timeLeft: number
}

function PomodoroTimer({timeLeft} : PomodoroTimerPropsType) {
    const [displayedElement,setDisplayedElement] = useState<React.ReactNode>();
    const {initialWorkTime,initialBreakTime,isWorking,currentCondition,isRunning,isFinished,isPause,
    startPomodoro,startOverPomodoro
    } = usePomodoroContext();
    
useEffect(() => {
  if(!isFinished){
    if(isRunning){
      
      setDisplayedElement(<TimerText text="⌛ Timer Running..."/>)
      switch (true) {
          case currentCondition.isQuarterTime:
            
            setDisplayedElement(<TimerText text="💡 Quarter Time Reached"/>)
            break;
      
          case currentCondition.isHalfTime:
            
            setDisplayedElement(<TimerText text="🔔 Half Time Reached"/>)
            break;
      
          case currentCondition.isQuarterBreakTime:
            
            setDisplayedElement(<TimerText text="☕ Quarter Break Time"/>)
            break;
      
          default:
           
            setDisplayedElement(<TimerText text="⌛ Timer Running..."/>)
            break;
        }
  }else{
      if(isPause){
        setDisplayedElement(<button onClick={startPomodoro} title="pause" className='w-[30%] h-[30%] transtale-x-3 
          hover:cursor-pointer '> 
            <Pause className='w-full h-full text-text '/>
          </button>)
      }
      else{
        setDisplayedElement(
          <button onClick={startPomodoro} title="start" className='w-[30%] h-[30%] transtale-x-3 
          hover:cursor-pointer '> 
            <Play className='w-full h-full text-text '/>
          </button>
        )  
      }
    }
  }else{
    setDisplayedElement(
    <button onClick={startOverPomodoro} title="start over" className='w-[30%] h-[30%] transtale-x-3 
    hover:cursor-pointer '>
      <RotateCcw className='w-full h-full text-text ' />
    </button>

    )
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
         {displayedElement}
        </div>
    </div> 

    </>
  )
}

export default PomodoroTimer