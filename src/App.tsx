import { useState } from 'react'
import './App.css'
import PomodoroTimer from './components/pomodoroTimer/PomodoroTimer'
import { TEMPLATE_COLOR } from './constant/colorConstant'
import MainContentLayout from './components/home/mainContent/MainContentLayout'
import Profile from './components/home/mainContent/profile/Profile'
import HeaderSection from './components/home/mainContent/HeaderSection/HeaderSection'
import PomodoroSection from './components/home/mainContent/PomodoroSection/PomodoroSection'
import TimeAndSessionSection from './components/home/mainContent/PomodoroSection/TimeAndSessionSection'
import SessionCategoryPicker from './components/home/mainContent/PomodoroSection/SessionsGroup'
import StartButton from './components/home/mainContent/PomodoroSection/startButton'
import { PomodoroProvider, usePomodoroContext } from './hooks/pomodoro/pomodoroContext'
import { TaskManagementProvider, useTaskManagementContext } from './hooks/taskManagement/taskManagementContext'
import TaskContentLayout from './components/home/taskFeature/taskContentLayout'
import TaskManagementContent from './components/home/taskFeature/TaskManagementContent'
import SessionalTaskSection from './components/home/taskFeature/SessionalTaskSection'
import TasksList from './components/home/taskFeature/TasksList.tsx'
import AddTasksModal from './components/home/taskFeature/AddTasksModal'
import FreeSessionTask from './components/home/taskFeature/FreeSessionTask'
import FreeSessionTasksList from './components/home/taskFeature/v2/FreeSessionTasksList.tsx'
import SessionBasedTasks from './components/home/taskFeature/v2/TasksList.tsx'
import { Plus,ArrowLeft,Check } from 'lucide-react'
import NewTaskButton from './components/home/taskFeature/v2/NewTasksToggle.tsx'
import SessionalBasedTasks from './components/home/taskFeature/v2/SessionalBasedTasks.tsx'
import TaskUnit from './components/home/taskFeature/element/taskUnit.tsx'
import AddCustomSessionModal from './components/home/mainContent/PomodoroSection/addCustomSession.tsx'
function App() {
  
  const [checkedTasks, setCheckedTasks] = useState<number[]>([]);
  const toggleCheck = (index: number) => {
    setCheckedTasks((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };
  const {isFocused,handleBackToMainPage} =usePomodoroContext();
  const {tasks} = useTaskManagementContext();
  if(isFocused){
    return(
      <>
     <div className="w-screen h-screen flex flex-col justify-center items-center pt-[1%] bg-background relative">
 
  <button
    onClick={handleBackToMainPage} // atau ganti dengan fungsi lain jika kamu pakai router
    className="absolute top-4 left-4 flex items-center gap-2 text-text hover:text-primary transition"
  >
    <ArrowLeft className="w-5 h-5" />
    <span>back</span>
  </button>

  <TimeAndSessionSection />


  <div className="w-[50%] h-full bg-[#D3C5A0] rounded-tl-2xl rounded-tr-2xl shadow-xl hover:shadow-2xl border-text px-[20px] py-[30px] overflow-y-scroll">
    <div className="w-full h-[50px] flex justify-center items-center text-xl font-semibold text-text capitalize gap-y-3">
      <h1>Session 1</h1>
    </div>

    {tasks.map((item, index) => {
  const isChecked = checkedTasks.includes(index);

  return (
    <div
      key={index}
      className="bg-background rounded-xl w-full h-[50px] my-2 flex items-center px-4"
    >
      <button
        onClick={() => toggleCheck(index)}
        className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-colors duration-200
          ${isChecked ? 'bg-primary border-primary' : 'border-gray-400'}`}
      >
        {isChecked && <Check size={14} color="white" strokeWidth={3} />}
      </button>

      <span
        className={`text-base ${
          isChecked ? 'line-through text-muted' : ''
        }`}
      >
        {item.content}
      </span>
    </div>
  );
})}

  </div>
</div>
      </>
    )
  }

  return (<>
  
  <AddTasksModal/>
  <AddCustomSessionModal/>
  {isFocused}
  <div className="w-screen h-screen flex flex-row justify-between gap-x-[54px] bg-background">
        {/* <nav className='
        h-full 
        w-[100px] bg-container'>

        </nav> */}
      <MainContentLayout 
      >
        <Profile/>
        
        <TimeAndSessionSection/>
        <SessionCategoryPicker/>
        {/* <StartButton/> */}
      </MainContentLayout>
       <TaskContentLayout>
          <div className='px-[20px] py-[30px]'>
             <h1 className="font-bold text-xl text-text ">
               Tasks
             </h1>
               <FreeSessionTasksList/>
                <SessionalBasedTasks/>
          </div>
          
          
       </TaskContentLayout>
    </div> 
  </>
  
  )
}

export default App
