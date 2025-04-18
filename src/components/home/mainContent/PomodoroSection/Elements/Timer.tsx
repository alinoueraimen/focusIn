import React from 'react'
import useUtils from '../../../../../utils/useUtils'

interface PomodoroTimerPropsType{
    timeLeft: number
}

function PomodoroTimer({timeLeft} : PomodoroTimerPropsType) {
    const {formatTime} = useUtils();
  return (
    <>
    <div className='h-[90%] aspect-square relative'>
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
            stroke='#7B9FF9'
            strokeWidth="8"
            fill='none'
            strokeLinecap='round'
            strokeDasharray={
                `${2*Math.PI * 45}`
            }
            strokeDashoffset={`${
               2*Math.PI *45*( 1 - 70/100) 
            }`}
            />
        </svg>
        <div className=' flex flex-col justify-center items-center absolute inset-0
        '>
            <h1>{formatTime(timeLeft)}</h1>
            <p>some text</p>
        </div>
    </div> 

    </>
  )
}

export default PomodoroTimer