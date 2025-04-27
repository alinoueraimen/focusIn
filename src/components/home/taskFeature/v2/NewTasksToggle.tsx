import React from 'react'
import { useTaskManagementContext } from '../../../../hooks/taskManagement/taskManagementContext'
import { Plus } from 'lucide-react';
function NewTaskButton() {
    const {openModal} = useTaskManagementContext();
  return (<>
     <button className='flex flex-row gap-x-1 text-sm items-center text-text my-auto' onClick={openModal}>
         <Plus/>
         <p>add a new task</p>
       </button>
  </>
 
  )
}

export default NewTaskButton