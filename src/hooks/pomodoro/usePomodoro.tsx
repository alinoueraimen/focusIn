import {useState,useEffect} from 'react'
import { TIMER_SPEED_UP } from '../../constant/pomodoroConstants';
type PomodoroSettings = {
  sessionCount: number | null;
  workDuration: number | null;
  shortBreak: number | null;
  longBreak: number | null;
};

type OptionSelectorProps = {
    label: string;
    options: number[];
    selected: number | null;
    onSelect: (value: number | null) => void;
  };

function usePomodoro() {
  const [settings, setSettings] = useState<PomodoroSettings>({
      sessionCount: null,
      workDuration: null,
      shortBreak: null,
      longBreak: null,
    });
    const [currentSession, setCurrentSession] = useState(1);
    const [isWorking, setIsWorking] = useState(true);
    const [initialTime, setInitialTime] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const isQuarterTime =initialTime !== 0 &&  initialTime / 4 >= timeLeft;
    const updateSetting = (key: keyof PomodoroSettings, value: number | null) => {
      setSettings((prev) => ({
        ...prev,
        [key]: prev[key] === value ? null : value,
      }));
    };

    const startPomodoro = () => {
      if (
        settings.sessionCount &&
        settings.workDuration &&
        settings.shortBreak &&
        settings.longBreak
      ) {
        
        setIsWorking(true);
        setInitialTime(settings.workDuration * 60); // dont change this !!
        setTimeLeft(settings.workDuration * 60);
        setIsRunning(true);
      } else {
        alert("Lengkapi semua pengaturan dulu ya 🛠️");
      }
    };

    const stopPomodoro = () => {
      setIsRunning(false);
    };

    const resetPomodoro = () => {
      setIsRunning(false);
      setCurrentSession(1);
      setTimeLeft(0);
      setIsWorking(true);
    };

    const playWorkSound : ()=>void = ()=>{
        console.log('playing the sound')
        const audio = new Audio('/work-sound.wav');
        audio.play();
      }
      const playBreakSound : ()=>void = ()=>{
        console.log('playing the sound')
        const audio = new Audio('/break-sound.wav');
        audio.play();
      }

      // Timer countdown
      useEffect(() => {
          if (!isRunning || timeLeft <= 0) return;
      
          const interval = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
          }, 1000 * TIMER_SPEED_UP);
      
          return () => clearInterval(interval);
        }, [isRunning, timeLeft]);

          // Transition logic
          useEffect(() => {
            
            if (timeLeft === 0 && isRunning) {
              if (isWorking) {
                // End of work session
                const isLast = currentSession === settings.sessionCount;
                if (isLast) {
                  setIsRunning(false);
                  alert("Semua sesi selesai 🎉");
                } else {
                  // Play break sound  
                    playBreakSound();
                  setIsWorking(false);
                  const breakTime =
                    currentSession % 2 === 0
                      ? settings.longBreak
                      : settings.shortBreak;
                  setTimeLeft((breakTime ?? 5) * 60);
                }
              } else {
                // play work sound
                playWorkSound();
                // End of break
                setIsRunning(false);
                setIsWorking(true);
                setCurrentSession((prev) => prev + 1);
                setTimeLeft((settings.workDuration ?? 25) * 60);
              }
            }
          }, [timeLeft, isRunning]);
        
  return {
    settings,
    currentSession,
    isWorking,
    initialTime,
    timeLeft,
    isRunning,
    isQuarterTime,
    updateSetting,
    startPomodoro,
    stopPomodoro,
    resetPomodoro
  }
}

export default usePomodoro