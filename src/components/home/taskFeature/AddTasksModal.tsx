import React from 'react'
import { useTaskManagementContext } from '../../../hooks/taskManagement/taskManagementContext';

function AddTasksModal() {
  const {isModalDisplayed,handleModalInputChange,addTask} = useTaskManagementContext();
  if(isModalDisplayed){
    return (
      
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-background rounded-lg p-6 shadow-lg w-[90%] max-w-md transform transition-transform duration-300 scale-100">
        <h1 className="font-medium text-lg text-text mb-3"> Add Task </h1>
        <form onSubmit={addTask}>
        <input
    placeholder="task name .."
    className="w-full border-2 border-text rounded-md p-2 resize-none overflow-hidden min-h-[38px] mb-3"
    onInput={(e) => {
      e.currentTarget.style.height = 'auto';
      e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
    }}
    onChange={(e)=>{handleModalInputChange(e)}}
  
  />
     <button className="w-full bg-primary text-white p-3 rounded-md  font-semibold capitalize" title="add" type="submit">
       <p className="text-white">add task</p>
     </button>
      </form>
      
        
      </div>
    </div>
    
    )
  }
  
}

export default AddTasksModal