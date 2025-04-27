import React,{useEffect} from 'react'
import NewTaskButton from './NewTasksToggle'
import { useTaskManagementContext } from '../../../../hooks/taskManagement/taskManagementContext'
type sessionTasksType = {
    sessionId : number
}
function SessionTasks({sessionId} : sessionTasksType) {
  const {setTaskSessionIdValue} =useTaskManagementContext();
  useEffect(()=>{
    setTaskSessionIdValue(sessionId);
  },[])
  return (
    <>
        <div className='flex flex-col gap-y-1 text-sm  text-text '>
         <div className=' py-2 px-5 rounded-xl bg-primary '>
           <p className="text-white font-bold ">
           Session {sessionId}
           </p>
         </div>
         <NewTaskButton />
    </div>
    </>
    
  )
}

export default SessionTasks