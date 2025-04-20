import {useState,useEffect} from 'react'
import { TIMER_SPEED_UP } from '../../constant/pomodoroConstants';
import {PomodoroSettings} from "../../types/index"

type CurrentConditionType = {
  isHalfTime  : boolean,
  isQuarterTime : boolean,
  isComplete : boolean,
  isQuarterBreakTime : boolean,
  isNetral : boolean
}

function usePomodoro() {
  const [settings, setSettings] = useState<PomodoroSettings>({
      sessionCount: null,
      workDuration: null,
      shortBreak: null,
      longBreak: null,
    });
    const [currentSession, setCurrentSession] = useState(1);
    const [sessionsCompleted,setSessionsCompleted] = useState(0);
    const [isWorking, setIsWorking] = useState(true);
    const [initialWorkTime, setInitialWorkTime] = useState (0);
    const [initialBreakTime,setInitialBreakTime]= useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isPause,setIsPause] = useState(false);
    const [currentCondition,setCurrentCondition] = useState<CurrentConditionType>({
      isHalfTime  : false,
      isQuarterTime : false,
      isComplete : false,
      isQuarterBreakTime : false,
      isNetral : true
    })    
   
    const updateSetting = (key: keyof PomodoroSettings, value: number | null) => {
      setSettings((prev) => ({
        ...prev,
        [key] : value,
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
        setInitialWorkTime(settings.workDuration * 60); // dont change this !!
        setInitialBreakTime(
          settings.shortBreak * 60)
        setIsRunning(true);
        
      } else {
        alert("Lengkapi semua pengaturan dulu ya 🛠️");
      }
    };

    const stopPomodoro = () => {
      setIsRunning(false);
      setIsPause(true);
    };
   
    const resetPomodoro = () => {
      setIsRunning(false);
      setCurrentSession(1);
      setTimeLeft(initialWorkTime);
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

      

      useEffect(()=>{
        console.log('settings state changed')
        console.group()
        console.log('work duration :',settings.workDuration)
        console.groupEnd()
        setTimeLeft((settings.workDuration ?? 0) * 60 )
        setInitialWorkTime((settings.workDuration ?? 0) * 60 )
        setInitialBreakTime(
          (settings.shortBreak ?? 0) * 60 
        )

      },[settings])

      // Timer countdown
      useEffect(() => {
        console.log('timeleft :',timeLeft)
          if (!isRunning || timeLeft <= 0) return;
      
          const interval = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
          }, 1000 * TIMER_SPEED_UP);
      
          return () => clearInterval(interval);
        }, [isRunning,timeLeft]);

          // Transition logic
          useEffect(() => {
            
            if (timeLeft === 0 && isRunning) {
             
              if (isWorking) {
                setSessionsCompleted((prev) => prev + 1);
                // End of work session
                const isLast = currentSession === settings.sessionCount;
                if (isLast) {
                  setIsRunning(false);
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

          useEffect(() => {
            const halfTimeOfWork = initialWorkTime * 0.75;
            const quarterTimeOfWork = initialWorkTime * 0.25;
            const halfTimeOfBreak = initialBreakTime * 0.75;
            const quarterTimeOfBreak = initialBreakTime * 0.25;
          
            const isValid =
              halfTimeOfWork > 0 &&
              quarterTimeOfWork > 0 &&
              halfTimeOfBreak > 0 &&
              quarterTimeOfBreak > 0;
          
            if (isValid) {
              if (isWorking) {
                if (halfTimeOfWork > timeLeft && timeLeft > quarterTimeOfWork) {
                  setCurrentCondition(prev => ({
                    ...prev,
                    isQuarterTime: false,
                    isHalfTime: true,
                    isQuarterBreakTime: false,
                    isNetral: false
                  }));
                } else if (quarterTimeOfWork >= timeLeft) {
                  setCurrentCondition(prev => ({
                    ...prev,
                    isHalfTime: false,
                    isQuarterTime: true,
                    isQuarterBreakTime: false,
                    isNetral: false
                  }));
                } else {
                  // Neutral (working, but no half/quarter)
                  setCurrentCondition(prev => ({
                    ...prev,
                    isHalfTime: false,
                    isQuarterTime: false,
                    isQuarterBreakTime: false,
                    isNetral: true
                  }));
                }
              } else {
                if (quarterTimeOfBreak >= timeLeft) {
                  setCurrentCondition(prev => ({
                    ...prev,
                    isHalfTime: false,
                    isQuarterTime: false,
                    isQuarterBreakTime: true,
                    isNetral: false
                  }));
                } else {
                  // Neutral (on break, but no quarter-break)
                  setCurrentCondition(prev => ({
                    ...prev ,
                    isHalfTime: false,
                    isQuarterTime: false,
                    isQuarterBreakTime: false,
                    isNetral: true
                  }));
                }
              }
            }
          }, [timeLeft, isWorking]);
          

          useEffect(() => {
            console.group("Current Condition Changed");
            console.log("isQuarterTime:", currentCondition.isQuarterTime);
            console.log("isHalfTime:", currentCondition.isHalfTime);
            console.log("isQuarterBreakTime:", currentCondition.isQuarterBreakTime);
            console.groupEnd();
          }, [currentCondition]);
          useEffect(()=>{
           console.log('current session :',currentSession);
           console.log("session completed :",sessionsCompleted)
          },[currentSession,sessionsCompleted])
       
  return {
    
    settings,
    currentSession,
    currentCondition,
    sessionsCompleted,
    isWorking,
    initialWorkTime,
    initialBreakTime,
    timeLeft,
    isRunning,
    isPause,
    updateSetting,
    startPomodoro,
    stopPomodoro,
    resetPomodoro,
    
  }
}

export default usePomodoro