import { createContext,ReactNode, useContext,useEffect } from "react";
import useTaskManagement from "./useTaskManagement";
const TaskManagementContext = createContext<ReturnType<typeof useTaskManagement> | null>(null);

export const TaskManagementProvider  =({children}:{children : ReactNode})=>{
    const taskManagement = useTaskManagement();
    const {tasks,loadTasksFromStorage} = taskManagement
    useEffect(()=>{
        console.log('fetching datas')
        const savedTask : string | null = localStorage.getItem('tasks') 
        console.log('savedTask :',savedTask)
        if(savedTask){
            console.log('setting tasks')
            loadTasksFromStorage(JSON.parse(savedTask))
        }
    },[])
    useEffect(()=>{
        console.log('saving tasks list')
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
   