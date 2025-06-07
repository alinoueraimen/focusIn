import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencil,faTrash } from "@fortawesome/free-solid-svg-icons"
import { useTaskManagementContext } from "../../../../hooks/taskManagement/taskManagementContext"

type taskUnitType =  {
    children  : string,
    key : number,
    id:number
}

function TaskUnit({children,id} :taskUnitType) {
  const {deleteTask,editTask,openModal} = useTaskManagementContext();
   return (
    <div className='w-full h-15 border-b-text border-b-[0.5px]
    flex justify-between items-center '>
      <p className={`text-text text-sm`} >{children}</p>
      <div className="w-fit h-full flex gap-x-3 items-center">  
        <button className="h-[40%] aspect-square  rounded-lg hover:cursor-pointer" title="edit" onClick={()=>{editTask(id) ;openModal()}}>
          <FontAwesomeIcon icon={faPencil} />
        </button>
        <button className="h-[40%] aspect-square  rounded-lg hover:cursor-pointer" title="delete" onClick={()=>{deleteTask(id)}}>
            
          <FontAwesomeIcon color="red" icon={faTrash} />
        </button>
        </div> 
    </div>
  )
}

export default TaskUnit