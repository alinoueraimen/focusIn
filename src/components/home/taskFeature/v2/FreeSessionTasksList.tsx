
import NewTaskButton from './NewTasksToggle'
import { useTaskManagementContext } from '../../../../hooks/taskManagement/taskManagementContext'
import TaskUnit from '../element/taskUnit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
function FreeSessionTasksList() {
    const {tasks} = useTaskManagementContext();
  return (
    <>
     <div className="flex flex-col gap-y-3  py-3 ">
       
          <div className="flex gap-x-3 items-center">
            <FontAwesomeIcon icon={faClipboard} size="xl" className="text-text"/>
          <h2 className="text-md text-text font-semibold">Anytime Tasks</h2>
          </div>
          
          <p className='text-sm text-text font-normal'>These tasks you can do anytime not tied to any pomodoro session</p>               
       
       
       {tasks.filter(item=>(!item.sessionId )).map((item)=>(
         <TaskUnit key={item.id} id={item.id}>
             {item.content}
         </TaskUnit>
       ))}
       <NewTaskButton/>
    </div>
    </>
  )
}

export default FreeSessionTasksList