import {useState,useEffect,useRef} from 'react'
import { TIMER_SPEED_UP } from '../../constant/pomodoroConstants'
import {PomodoroSettings} from "../../types/index"
import { usePomodoroSessionContext } from '../sessionType/usePomodoroSession'
import useUtils from '../../utils/useUtils'


type CurrentConditionType = {
  isHalfTime  : boolean,
  isQuarterTime : boolean,
  isComplete : boolean,
  isQuarterBreakTime : boolean,
  isNetral : boolean
}

function usePomodoro() {
    const {playSound} = useUtils();
    const {selectedSession} =usePomodoroSessionContext();  
    const [currentSession, setCurrentSession] = useState(1);
    const [sessionsCompleted,setSessionsCompleted] = useState(0);
    const [isWorking, setIsWorking] = useState(true);
    const [initialWorkTime, setInitialWorkTime] = useState (0);
    const [initialBreakTime,setInitialBreakTime]= useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isPause,setIsPause] = useState(false);
    const [isFocused,setIsFocused] = useState <boolean> (true);
    const [currentCondition,setCurrentCondition] = useState<CurrentConditionType>({
      isHalfTime  : false,
      isQuarterTime : false,
      isComplete : false,
      isQuarterBreakTime : false,
      isNetral : true
    })    
    const [isFinished,setIsFinished] = useState(false);
    const [dotsStatus,setDotsStatus] = useState<boolean[]>([])
    const [isAddCustomSessionModulDisplay,setIsAddCustomSessionModulDisplay] = useState<boolean>(false);
    const [customSessions,setCustomSessions] = useState<PomodoroSettings[]>([])
    const [isBackToHomeModalDisplayed,setIsBackToHomeModalDisplayed] = useState<boolean>(false)
    const [isBreak,setIsBreak] = useState(false);
    const [isInitialized, setIsInitialized] = useState(true);
    const initializeComplete=()=>{
      setIsInitialized(false);
    }
    const loadIsFocusedFromLocalStorage=(data : boolean)=>{
      setIsFocused(data)
      setIsInitialized(false);
    }
    const loadTimeLeftFromLocalStorage=(data : number)=>{
      setTimeLeft(data);
      setIsInitialized(false);
    }
    const loadinitialWorkTimeFromLocalStorage=(data : number)=>{
      setInitialWorkTime(data);
      setIsInitialized(false);
    }
    const loadinitialBreakTimeFromLocalStorage=(data : number)=>{
      setInitialBreakTime(data);
      setIsInitialized(false);
    }
    const loadIsRunningFromLocalStorage=(data : boolean)=>{
      setIsRunning(data);
      setIsInitialized(false);
    }
    const loadIsFinishedFromLocalStorage=(data : boolean)=>{
      setIsFinished(
        data
      )
      setIsInitialized(false)
    }
    const openCustomSessionModal = () =>{
      setIsAddCustomSessionModulDisplay(true)
    }
    const closeCustomSessionModal = () =>{
      setIsAddCustomSessionModulDisplay(false)
    }
    const submitCustomSession = (value : PomodoroSettings) => {
      setCustomSessions(prev=>[...prev,value])
    }

    const updateDotStatus=(index : number)=>{
      if(sessionsCompleted > index){
        setDotsStatus(prev=>{
          const list = [...prev];
          list[index]= true;
          return list
        }) 
      }
    }
   

    const startPomodoro = () => {
  if (selectedSession.sessionCount > 0 ) {
    setIsPause(false);
    setIsRunning(true);
    setIsWorking(true);
    setIsFocused(true);
    
    const workTimeInSeconds = selectedSession.workDuration * 60;
    const breakTimeInSeconds = selectedSession.shortBreak * 60;
    
    setInitialWorkTime(workTimeInSeconds);
    setInitialBreakTime(breakTimeInSeconds);
    if(!isFocused){
      setTimeLeft(workTimeInSeconds); 
    }
    
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
      setSessionsCompleted(0);
      if (selectedSession.sessionCount !== null) {
        setDotsStatus(Array(selectedSession.sessionCount).fill(false));
      }
    };
    const startOverPomodoro = () => {
      setIsRunning(false);
      setCurrentSession(1);
      setTimeLeft(initialWorkTime);
      setIsWorking(true);
      setIsFinished(false);
      setSessionsCompleted(0);
      if (selectedSession.sessionCount !== null) {
        setDotsStatus(Array(selectedSession.sessionCount).fill(false));
      }
      
    };

    
      

    const handleBackToMainPage=()=>{
      setIsFocused(false);
      setIsRunning(false);
      setCurrentSession(1);
      setTimeLeft(initialWorkTime);
      setIsWorking(true);
      setIsFinished(false);
      setSessionsCompleted(0);
      if (selectedSession.sessionCount !== null) {
        setDotsStatus(Array(selectedSession.sessionCount).fill(false));
      }
    }
    
// Save settings to localStorage

    const intervalRef = useRef<number | null>(null);

useEffect(() => {
  if (!isRunning || timeLeft <= 0) return;

  intervalRef.current = setInterval(() => {
    setTimeLeft((prev) => prev - 1);
  }, 1000 * TIMER_SPEED_UP);

  return () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
}, [isRunning]);
  useEffect(() => {
    console.log('heiii aku mau set ke localstorage loh')
    console.log(isInitialized);
    if(!isInitialized) {
      
      
      localStorage.setItem('pomodoro-isFocused',isFocused.toString());
    }
    
  }, [isFocused,isInitialized]);
  useEffect(() => {
 
    console.log(isInitialized);
    if(!isInitialized) {
      
      
      localStorage.setItem('pomodoro-timeLeft',timeLeft.toString());
    }
    
  }, [timeLeft,isInitialized]);
  useEffect(() => {
 
    console.log(isInitialized);
    if(!isInitialized) {
      
      
      localStorage.setItem('pomodoro-isRunning',isRunning.toString());
    }
    
  }, [isRunning,isInitialized]);
  useEffect(() => {
 
    console.log(isInitialized);
    if(!isInitialized) {
      
      
      localStorage.setItem('pomodoro-initialWorkTime',initialWorkTime.toString());
    }
    
  }, [initialWorkTime,isInitialized]);
  useEffect(() => {
 
    console.log(isInitialized);
    if(!isInitialized) {
      
      
      localStorage.setItem('pomodoro-isFinished',isFinished.toString());
    }
    
  }, [isFinished,isInitialized]);
  useEffect(() => {
 
    console.log(isInitialized);
    if(!isInitialized) {
      
      
      localStorage.setItem('pomodoro-initialBreakTime',initialBreakTime.toString());
    }
    
  }, [initialBreakTime,isInitialized]);

          // Transition logic
          useEffect(() => {
            
            if (timeLeft === 0 && isRunning) {
             
              if (isWorking) {
               
                // End of work session
                const isLast = currentSession === selectedSession.sessionCount;
                
                if (isLast) {
                  setSessionsCompleted(prev => prev + 1);
                  setIsFinished(true);
                  setIsRunning(false);
                } else {
                  // Play break sound  
                  setIsBreak(true)
                  setSessionsCompleted(prev=> prev +1)
                  playSound('/break-sound.wav')
                  setIsWorking(false);
                  const breakTime =
                    currentSession % 2 === 0
                      ? selectedSession.longBreak
                      : selectedSession.shortBreak;
                  console.log("breakTime :",breakTime)    
                  setInitialBreakTime((breakTime ?? 5) * 60);
                  setTimeLeft((breakTime ?? 5) * 60);
                 
                }
              } else {
                // play work sound
                playSound('/work-sound.mp3')
                // End of break
                setIsBreak(false)
                setIsRunning(false);
                setIsWorking(true);
                setCurrentSession((prev) => prev + 1);
                
                setTimeLeft((selectedSession.workDuration ?? 25) * 60);
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
          

          // useEffect(() => {
          //   console.group("Current Condition Changed");
          //   console.log("isQuarterTime:", currentCondition.isQuarterTime);
          //   console.log("isHalfTime:", currentCondition.isHalfTime);
          //   console.log("isQuarterBreakTime:", currentCondition.isQuarterBreakTime);
          //   console.groupEnd();
          // }, [currentCondition]);
          useEffect(()=>{
           console.log('current session :',currentSession);
           console.log("session completed :",sessionsCompleted)
           if(sessionsCompleted !== 0){
            updateDotStatus(sessionsCompleted - 1 )
           }
           
          },[currentSession,sessionsCompleted])
          useEffect(()=>{
              console.log('dots status :',dotsStatus)
          },[dotsStatus])
          useEffect(()=>{
           if (selectedSession.sessionCount !== null) {
              setDotsStatus(Array(selectedSession.sessionCount).fill(false));
            }
          },[selectedSession.sessionCount])
  return {
    
    
    currentSession,
    currentCondition,
    sessionsCompleted,
    isWorking,
    initialWorkTime,
    initialBreakTime,
    timeLeft,
    isRunning,
    isPause,
    isFinished,
    isFocused,
    isBreak,
    dotsStatus,
    isAddCustomSessionModulDisplay,
    customSessions,
    isBackToHomeModalDisplayed,
    isInitialized,
    setIsBackToHomeModalDisplayed,
    setTimeLeft,
    setIsFocused,
  openCustomSessionModal,
    startPomodoro,
    stopPomodoro,
    resetPomodoro,
    startOverPomodoro,
    updateDotStatus,
    handleBackToMainPage,
    submitCustomSession,
    closeCustomSessionModal,
    loadIsFocusedFromLocalStorage,
    loadTimeLeftFromLocalStorage,
    loadIsRunningFromLocalStorage,
    loadinitialWorkTimeFromLocalStorage,
    loadinitialBreakTimeFromLocalStorage,
    loadIsFinishedFromLocalStorage,
    initializeComplete
  }
}

export default usePomodoro