import React from 'react'
import { usePomodoroContext } from '../../../../hooks/pomodoro/pomodoroContext'



function StartButton() {
  const {startPomodoro,stopPomodoro,isRunning,isPause,resetPomodoro,isFinished,startOverPomodoro} = usePomodoroContext();

  if(isFinished){
    return(
      <div className="w-full h-fit flex justify-center bg-container">
      <button className='w-fit h-full
       bg-container px-5 py-3 hover:cursor-pointer'
       onClick={()=>{startOverPomodoro()}}
       >
           start over
      </button> 
      </div>
      )
  }
  
  if(isRunning){
    return(
    <div className="w-full h-fit flex justify-center bg-container">
    <button className='w-fit h-full
     bg-container px-5 py-3 hover:cursor-pointer'
     onClick={()=>{stopPomodoro()}}
     >
         pause
    </button>
    <button className='w-fit h-full
     bg-container px-5 py-3 hover:cursor-pointer'
     onClick={()=>{resetPomodoro()}}
     >
         reset
    </button>
    
    </div>
    )
  }
  

  return (
    <div className="w-full h-fit flex justify-center bg-container">
<button className='w-fit h-full
 bg-container px-5 py-3 hover:cursor-pointer'
 onClick={()=>{startPomodoro()}}
 >
    {!isPause ?'start':'continue'}
</button>
</div>
  )
}



export default StartButton
