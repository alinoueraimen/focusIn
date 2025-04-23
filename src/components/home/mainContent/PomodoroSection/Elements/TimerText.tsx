import React from 'react'
import useUtils from '../../../../../utils/useUtils'
import usePomodoro from '../../../../../hooks/pomodoro/usePomodoro';
import { usePomodoroContext } from '../../../../../hooks/pomodoro/pomodoroContext';

type TimerTextPropsType = {
    text : string
}

function TimerText({text} : TimerTextPropsType) {
    const {formatTime} = useUtils();
    const {timeLeft,stopPomodoro} = usePomodoroContext();
    
  return (
    <button onClick={()=>{
        console.log('pause')
        stopPomodoro();
    }
    } className={`hover:cursor-pointer`}>
    <h1 className='text-text font-semibold text-[40px]'>{formatTime(timeLeft)}</h1>
    <p className='text-text font-normal'>{text}</p>
    </button>
  )
}

export default TimerText