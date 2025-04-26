import React from 'react'

type taskUnitType =  {
    children  : React.ReactNode
}

function TaskUnit({children} :taskUnitType) {
   return (
    <div className='w-full h-15 border-b-text border-b-[0.5px]
    flex justify-between items-center'>
      <p className={`text-text `} >{children}</p>
      <input type="checkbox" title="checkbox"/>
    </div>
  )
}

export default TaskUnit