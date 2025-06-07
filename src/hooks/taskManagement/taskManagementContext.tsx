import { createContext,ReactNode, useContext,useEffect } from "react";
import useTaskManagement from "./useTaskManagement";
const TaskManagementContext = createContext<ReturnType<typeof useTaskManagement> | null>(null);

export const TaskManagementProvider  =({children}:{children : ReactNode})=>{
    const taskManagement = useTaskManagement();
    const {tasks,loadTasksFromStorage} = taskManagement
    useEffect(()=>{
      
        const savedTask : string | null = localStorage.getItem('tasks') 
      
        if(savedTask){
            
            loadTasksFromStorage(JSON.parse(savedTask))
        }
    },[])
    useEffect(()=>{
        
        localStorage.setItem('tasks',JSON.stringify(tasks))
    },[tasks])
    return (
        <TaskManagementContext.Provider value={taskManagement}>
            {children}
        </TaskManagementContext.Provider>
    )
}
export const useTaskManagementContext=()=>{
   const context = useContext(TaskManagementContext);
    if(!context){
        throw new Error("there something wrong with pomodoro context")
    }
    return context
}
   