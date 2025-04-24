import { createContext,ReactNode, useContext } from "react";
import useTaskManagement from "./useTaskManagement";
const TaskManagementContext = createContext<ReturnType<typeof useTaskManagement> | null>(null);

export const TaskManagementProvider  =({children}:{children : ReactNode})=>{
    const taskManagement = useTaskManagement();
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
   