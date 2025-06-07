import React, { useEffect, useState } from 'react'
import { usePomodoroContext } from '../../../../../hooks/pomodoro/pomodoroContext';
import {Play,Pause,RotateCcw} from 'lucide-react'

import TimerText from './TimerText'

function PomodoroTimer() {
    const [displayedElement,setDisplayedElement] = useState<React.ReactNode>();
    const {initialWorkTime,initialBreakTime,isWorking,currentCondition,isRunning,isFinished,isPause,
    startPomodoro,startOverPomodoro,timeLeft
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
      }, [currentCondition, isRunning, isPause, isFinished]);

  return (
    <>
   <div className="h-fit aspect-square relative">
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle
      cx="50"
      cy="50"
      r="40"
      stroke="#D9D9D9"
      strokeWidth="12"
      fill="none"
    />
    <circle
      cx="50"
      cy="50"
      r="40"
      stroke="#A3C4A8"
      strokeWidth="12"
      fill="none"
      strokeLinecap="round"
      strokeDasharray={`${2 * Math.PI * 40}`}
      strokeDashoffset={`${
        2 * Math.PI * 40 * (1 - timeLeft / (isWorking ? initialWorkTime : initialBreakTime))
      }`}
        className="transform -rotate-90"
       style={{ transformOrigin: '50% 50%' }}
    />
  </svg>

  <div className="absolute inset-0 flex items-center justify-center text-center">
    {displayedElement}
  </div>
</div>

      </>
  )
}

export default PomodoroTimer