import React,{useRef,useState} from 'react'
import { useTaskManagementContext } from '../../../hooks/taskManagement/taskManagementContext'



function TaskManagementContent() {
    const [isDisplay,setIsDisplay] = useState(false)
    const {addTasks,selectTask,deleteTask,editTask,tasks} = useTaskManagementContext();
    const timeRef = useRef<number | null>(null);
    const handleMouseDown=()=>{
        timeRef.current = setTimeout(()=>{
            console.log('you long pressed')
            setIsDisplay(true);
        },500)
    }
    const handleMouseUp=()=>{
        if(timeRef.current !== null){
            clearTimeout(timeRef.current)
        }
    }
  return (
    <>
         <button className="p-5 bg-amber-500 hover:cursor-pointer" onClick={()=>{addTasks('test')}}>
          add
         </button>
         <div>
         {tasks.map((task, index) => (
  <button
    className="p-5 bg-primary hover:cursor-pointer"
    key={task.id}
    onMouseDown={handleMouseDown}
    onMouseUp={handleMouseUp}
  >
    {isDisplay && <input title="checkbox" type="checkbox" onChange={()=>{selectTask(index)}}/>}   
    {task.content}
    <button className={`ml-5`} onClick={()=>{editTask(task.id)}}>
        edit
    </button>
  </button>
))}
<button className="p-5 bg-red-700 hover:cursor-pointer" onClick={()=>{deleteTask()}}>
          delete
         </button>
         </div>
    </>
  )
}

export default TaskManagementContent