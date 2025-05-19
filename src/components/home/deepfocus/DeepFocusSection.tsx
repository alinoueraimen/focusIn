import React,{useState} from 'react'
import {Check,ArrowLeft} from 'lucide-react'
import TimeAndSessionSection from '../mainContent/PomodoroSection/TimeAndSessionSection';

import { usePomodoroContext } from '../../../hooks/pomodoro/pomodoroContext';
import PomodoroTimer from '../mainContent/PomodoroSection/Elements/Timer';
import '../../../style/sparkle.css'
import { useTaskManagementContext } from '../../../hooks/taskManagement/taskManagementContext';
function DeepFocusSection() {

    const [checkedTasks, setCheckedTasks] = useState<number[]>([]);
    const toggleCheck = (index: number) => {
        setCheckedTasks((prev) =>
          prev.includes(index)
            ? prev.filter((i) => i !== index)
            : [...prev, index]
        );
      };
      const {tasks} = useTaskManagementContext();
      const {handleBackToMainPage} =usePomodoroContext();
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center pt-[1%] bg-background relative">
 
  <button
    onClick={handleBackToMainPage} // atau ganti dengan fungsi lain jika kamu pakai router
    className="absolute top-4 left-4 flex items-center gap-2 text-text hover:text-primary transition"
  >
    <ArrowLeft className="w-5 h-5" />
    <span>back</span>
  </button>
  <div className="w-fit h-fit my-[30px]">
  <TimeAndSessionSection timerVariant={<PomodoroTimer />}/>
  </div>


  <div className="w-[50%] h-full bg-[#D3C5A0] rounded-tl-2xl rounded-tr-2xl shadow-xl hover:shadow-2xl border-text px-[20px] py-[30px] overflow-y-scroll">
    {/* <div className="w-full h-[50px] flex justify-center items-center text-xl font-semibold text-text capitalize gap-y-3">
      <h1>Session 1</h1>
    </div> */}

{tasks.map((item, index) => {
  const isChecked = checkedTasks.includes(index);
  const isSessionTask = !!item.sessionId;

  return (
    <div
      key={index}
      className={`
        bg-background rounded-xl w-full h-[50px] my-2 flex items-center px-4 relative
        ${isChecked ? "bg-primary sparkle" : ""}
        border-l-4 ${isSessionTask ? "border-primary" : "border-gray-400"}
      `}
    >
      <button
        onClick={() => toggleCheck(index)}
        className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-colors duration-200
          ${isChecked ? 'bg-primary border-primary' : 'border-gray-400'}
        `}
      >
        {isChecked && <Check size={14} color="white" strokeWidth={3} />}
      </button>

      <span
        className={`text-base relative flex items-center gap-1 ${
          isChecked ? 'line-through text-muted text-white' : ''
        }`}
      >
        {/* Bullet kecil sebagai visual tambahan */}
        <span className={`w-2 h-2 rounded-full ${
          isSessionTask ? "bg-primary" : "bg-gray-400"
        }`}></span>
        {item.content}
      </span>
    </div>
  );
})}


  </div>
</div>
  )
}

export default DeepFocusSection