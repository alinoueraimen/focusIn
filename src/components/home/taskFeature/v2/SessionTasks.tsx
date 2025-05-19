import React,{useEffect} from 'react'
import NewTaskButton from './NewTasksToggle'
import { useTaskManagementContext } from '../../../../hooks/taskManagement/taskManagementContext'
import TaskUnit from '../element/taskUnit'
type sessionTasksType = {
    sessionId : number
}
function SessionTasks({sessionId} : sessionTasksType) {
  const {tasks} =useTaskManagementContext();
  
  return (
    <>
        <div className='flex flex-col gap-y-1 text-sm  text-text '>
         <div className=' py-2 px-5 rounded-xl bg-primary '>
           <p className="text-white font-bold ">
           Session {sessionId}
           </p>
         </div>
         {tasks.filter((item)=>(item.sessionId === sessionId)).map((item)=>(
                             <TaskUnit key={item.id}>
                                 {item.content}
                             </TaskUnit>
                           ))}
         <NewTaskButton sessionId = {sessionId}/>
    </div>
    </>
    
  )
}

export default SessionTasks