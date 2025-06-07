import { createContext, ReactNode, useContext, useEffect } from "react";
import usePomodoro from "./usePomodoro";

const PomodoroContext = createContext<ReturnType<typeof usePomodoro> | null>(null);

export const PomodoroProvider = ({ children }: { children: ReactNode }) => {
  const pomodoro = usePomodoro();
  const {loadIsFinishedFromLocalStorage,  loadIsFocusedFromLocalStorage,loadTimeLeftFromLocalStorage,loadIsRunningFromLocalStorage,initializeComplete,loadinitialWorkTimeFromLocalStorage,loadinitialBreakTimeFromLocalStorage } = pomodoro;

  // Load dari localStorage saat pertama kali mount
  useEffect(() => {

  try {
    const savedIsFocused: string | null = localStorage.getItem('pomodoro-isFocused');
    const isFocusedValue = savedIsFocused === 'true';

    const savedTimeLeft: string | null = localStorage.getItem('pomodoro-timeLeft');
    const timeLeftValue = Number(savedTimeLeft);
    const savedInitialWorkTime: string | null = localStorage.getItem('pomodoro-initialWorkTime');
    const initialWorkTimeValue = Number(savedInitialWorkTime);
    const savedInitialBreakTime: string | null = localStorage.getItem('pomodoro-initialBreakTime');
    const initialBreakTimeValue = Number(savedInitialBreakTime);

    const savedIsRunning: string | null = localStorage.getItem('pomodoro-isRunning');
    const isRunningValue = savedIsRunning === 'true';

    const savedIsFinished: string | null = localStorage.getItem('pomodoro-isFinished');
    const isFinished = savedIsFinished === 'true';    
    if (savedIsFocused !== null && savedTimeLeft !== null && !isNaN(timeLeftValue)) {
      
      loadIsFocusedFromLocalStorage(isFocusedValue);
      loadTimeLeftFromLocalStorage(timeLeftValue);
      loadIsRunningFromLocalStorage(isRunningValue);
      loadinitialWorkTimeFromLocalStorage(initialWorkTimeValue);
      loadinitialBreakTimeFromLocalStorage(
        initialBreakTimeValue
      )
      loadIsFinishedFromLocalStorage(isFinished);
    }
  } catch (error) {
    console.error( error);
  } finally {
    initializeComplete();
  }
}, []);// Hanya jalankan sekali saat mount

  // Save settings to localStorage
  


  

  return (
    <PomodoroContext.Provider value={pomodoro}>
      {children}
    </PomodoroContext.Provider>
  );
};

export const usePomodoroContext = () => {
  const context = useContext(PomodoroContext);
  if (!context) {
    throw new Error("usePomodoroContext must be used within PomodoroProvider");
  }
  return context;
};