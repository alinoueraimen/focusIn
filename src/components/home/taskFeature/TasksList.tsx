import React from 'react'
import {Plus} from 'lucide-react'
function TasksList() {
  return (
    <>
    <div className="h-[70%] w-full px-[20px] py-[30px]">
          <div className='flex flex-row justify-between items-center'>
            <div>
            <h1 className='font-semibold text-lg text-text'>Tasks</h1>
            <p className="text-sm text-text ">All Session</p>
            </div>
            <button title="plus" className="border h-fit p-1 rounded-md" >
                 <Plus/>
             </button> 
          </div>
          
          <div>
            <div className='w-full h-15 border-b-text border-b-[0.5px]
            flex justify-between items-center'>
              <p className="text-text">tasks</p>
              <input type="checkbox" title="checkbox"/>
            </div>
            <div className='w-full h-15 border-b-text border-b-[0.5px]
            flex justify-between items-center'>
              <p className="text-text">tasks</p>
              <input type="checkbox" title="checkbox"/>
            </div>
            <div className='w-full h-15 border-b-text border-b-[0.5px]
            flex justify-between items-center'>
              <p className="text-text">tasks</p>
              <input type="checkbox" title="checkbox"/>
            </div>
            <div className='w-full h-15 border-b-text border-b-[0.5px]
            flex justify-between items-center'>
              <p className="text-text">tasks</p>
              <input type="checkbox" title="checkbox"/>
            </div>
            
          </div>
          </div>
    </>
  )
}

export default TasksList