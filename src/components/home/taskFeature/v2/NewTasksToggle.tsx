import React from 'react'
import { useTaskManagementContext } from '../../../../hooks/taskManagement/taskManagementContext'
import { Plus } from 'lucide-react';
function NewTaskButton({sessionId} : {sessionId : number}) {
  const {setTaskSessionIdValue} = useTaskManagementContext();  
  const handleClick =  () =>{
    
    setTaskSessionIdValue(sessionId);
      openModal()
    }
    const {openModal} = useTaskManagementContext();
  return (<>
     <button className='flex flex-row gap-x-1 text-sm items-center text-text my-auto' onClick={handleClick}>
         <Plus/>
         <p>add a new task</p>
       </button>
  </>
 
  )
}

export default NewTaskButton