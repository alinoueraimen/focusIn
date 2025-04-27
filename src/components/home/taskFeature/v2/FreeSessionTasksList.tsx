import React from 'react'
import NewTaskButton from './NewTasksToggle'
import { useTaskManagementContext } from '../../../../hooks/taskManagement/taskManagementContext'
import TaskUnit from '../element/taskUnit';

function FreeSessionTasksList() {
    const {tasks} = useTaskManagementContext();
  return (
    <>
     <div className="flex flex-col gap-y-1 border-b-[0.5px] border-b-text py-3 ">
                  <h2 className="text-md text-text font-semibold">Free Session Task</h2>
                  {tasks.map((item)=>(
                    <TaskUnit key={item.id}>
                        {item.content}
                    </TaskUnit>
                  ))}
                  <NewTaskButton/>
    </div>
    </>
  )
}

export default FreeSessionTasksList