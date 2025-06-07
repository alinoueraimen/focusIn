
import { useTaskManagementContext } from '../../../../hooks/taskManagement/taskManagementContext'
import { Plus } from 'lucide-react';
function NewTaskButton({sessionId} : {sessionId ?: number}) {
  const {setTaskSessionIdValue} = useTaskManagementContext();  
  const handleClick =  () =>{
    
    setTaskSessionIdValue(sessionId);
      openModal()
    }
    const {openModal} = useTaskManagementContext();
  return (<>
     <button className='w-full h-12  border-b-[0.5px]
    flex gap-x-3 items-center text-text text-sm hover:cursor-pointer' onClick={handleClick}>
         <Plus/>
         <p>add a new task</p>
       </button>
  </>
 
  )
}

export default NewTaskButton