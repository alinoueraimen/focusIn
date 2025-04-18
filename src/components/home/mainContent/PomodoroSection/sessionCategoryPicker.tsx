import React from 'react'

function SessionCategoryPicker() {
  return (
    <div className='w-full h-[15%] flex flex-row justify-center'>
    <button className='w-1/3 h-full bg-container'
     onClick={()=>{console.log('click')}}    
    >
        pomodoro
        </button>      

    </div>
  )
}

export default SessionCategoryPicker