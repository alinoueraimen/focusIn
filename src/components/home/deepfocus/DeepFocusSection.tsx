
import {  ArrowLeft } from 'lucide-react'
import TimeAndSessionSection from '../mainContent/PomodoroSection/TimeAndSessionSection';
import { usePomodoroContext } from '../../../hooks/pomodoro/pomodoroContext';
import PomodoroTimer from '../mainContent/PomodoroSection/Elements/Timer';
import '../../../style/sparkle.css'

import BackToHomeModal from './BackToHomeModal';
import { useTaskManagementContext } from '../../../hooks/taskManagement/taskManagementContext';
import AddTasksModal from '../taskFeature/AddTasksModal';
import TasksSection from './TasksSection';
import CompletionSection from './CompletionSection';
import TasksStatusBanner from './TasksStatusBanner';
function DeepFocusSection() { 
  const { setIsBackToHomeModalDisplayed} = usePomodoroContext();
  const {isModalDisplayed} =useTaskManagementContext();
  return (
  <>
      {isModalDisplayed && <AddTasksModal/>}
      <BackToHomeModal/>
      <div className="w-screen h-screen flex flex-col justify-center items-center pt-[1%] bg-background relative">
      <button
        onClick={()=>{setIsBackToHomeModalDisplayed(true)}}
        className=" flex items-center gap-2 text-text hover:text-primary transition absolute top-3 left-3"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>back</span>
      </button>

      <div className="w-fit h-fit my-[30px]">
        <TimeAndSessionSection timerVariant={<PomodoroTimer />} />
      </div>

      {/* Session Status Banner */}
      <TasksStatusBanner/>     

      {/* Task Section */}
      <TasksSection/>
      <CompletionSection/>
    </div>
  </>
  
  );
}

export default DeepFocusSection;