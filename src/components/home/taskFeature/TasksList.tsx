
import {Plus} from 'lucide-react'
import { useTaskManagementContext } from '../../../hooks/taskManagement/taskManagementContext';
import TaskUnit from './element/taskUnit';
function TasksList() {
  const {openModal,tasks} = useTaskManagementContext();
  return (
    <>
    <div className="h-[70%] w-full px-[20px] py-[30px]">
          <div className='flex flex-row justify-between items-center'>
            <div>
            <h1 className='font-semibold text-lg text-text'>Tasks</h1>
            <p className="text-sm text-text ">All Session</p>
            </div>
            <button title="plus" className="border h-fit p-1 rounded-md" onClick={openModal}>
                 <Plus/>
             </button> 
          </div>
          <div>
            {
              tasks.map((item,index)=>(
                <TaskUnit key={index} id={item.id}>
                  {item.content}
                </TaskUnit>
              ))
            }
           
          </div>
          </div>
    </>
  )
}

export default TasksList