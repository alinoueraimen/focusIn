import { useState,useEffect } from "react"
function PomodoroTimer(){
    const DUMMY_TIME = 5*60 // 50 menit
    const [time, setTime] = useState(DUMMY_TIME);
    const [isActive, setIsActive] = useState(false);
    useEffect(()=>{
        if(isActive && time > 0){
            const timer = setInterval(()=>{
                setTime(prev=> prev - 1)
            },1000
            ) 
            return ()=>{clearInterval(timer)}
        }
    },[time,isActive])
    const formattedTime = (time : number) => {
        console.log(time)
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
    const handleStart = () => {
        setIsActive(true);
    }
    const handlePause= () =>{
        setIsActive(false);
    }
    const handleReset = () => {
        setTime(DUMMY_TIME);
        setIsActive(false);
    }
    return(
        <>
            <h1>{formattedTime(time)}</h1>
            <button onClick={handleStart}>
            <h2>start</h2>
            </button>
            <button onClick={handlePause}>
            <h3>pause</h3>
            </button>
            <button onClick={handleReset}>
            <h3>reset</h3>
            </button>

            
        </>
    )
}
export default PomodoroTimer