import { createContext,ReactNode, useContext } from "react";
import usePomodoro from "./usePomodoro";
const PomodoroContext = createContext<ReturnType<typeof usePomodoro> | null>(null);

export const PomodoroProvider  =({children}:{children : ReactNode})=>{
    const pomodoro = usePomodoro();
    return (
        <PomodoroContext.Provider value={pomodoro}>
            {children}
        </PomodoroContext.Provider>
    )
}
export const usePomodoroContext=()=>{
   const context = useContext(PomodoroContext);
    if(!context){
        throw new Error("there something wrong with pomodoro context")
    }
    return context
}
   