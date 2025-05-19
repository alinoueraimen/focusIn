import { useState,useEffect } from 'react'
import './App.css'
import PomodoroTimer from './components/home/mainContent/PomodoroSection/Elements/Timer.tsx'
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
import HourglassTimer from './test/HourGlass.tsx'
import DeepFocusSection from './components/home/deepfocus/DeepFocusSection.tsx'


function App() {
  
 
  const [currentTimerVariant, setCurrentTimerVariant] = useState<number>(0);
  const {timeLeft} = usePomodoroContext();
  
  const timersVariants = [
    <TimeAndSessionSection timerVariant={<PomodoroTimer />} key="time-session" />,
    <TimeAndSessionSection timerVariant={<HourglassTimer/>} key="time-session" />,
  ];
 
  const {isFocused} =usePomodoroContext();
  const {isSectionDisplayed,showSection,hideSection} = useTaskManagementContext();
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Fungsi handler saat resize
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Pasang event listener resize
    window.addEventListener('resize', handleResize);

    // Bersihkan event listener saat unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency supaya efek jalan sekali saat mount
   // Fungsi pindah ke komponen berikutnya
   const handleNext = () => {
    setCurrentTimerVariant((prev) => (prev + 1) % timersVariants.length);
  };

  // Fungsi pindah ke komponen sebelumnya
  const handlePrev = () => {
    setCurrentTimerVariant((prev) => (prev - 1 + timersVariants.length) % timersVariants.length);
  };
  if(isFocused){
    return(
      <>
        <DeepFocusSection/>
      </>
    )
  }
  
  
 
  return (
  <>
 
  <AddTasksModal/>
  <AddCustomSessionModal/>
  {isFocused}
  <div className="w-screen h-screen flex flex-row justify-between gap-x-[54px] bg-background overflow-x-hidden">
       
      <MainContentLayout 
      >
      
        
        
        <div className="flex flex-col items-center">
           <div onClick={showSection} className="absolute w-fit h-fit p-5 bg-red-500 right-5">
           <button>x</button>
         </div>
      <div className="flex justify-center items-center gap-4">
        <button onClick={handlePrev} className="p-2 bg-gray-300 rounded">
          &lt; {/* panah kiri */}
        </button>

          {timersVariants[currentTimerVariant
          ]}
        <button onClick={handleNext} className="p-2 bg-gray-300 rounded">
          &gt; {/* panah kanan */}
        </button>
      </div>
    </div>
        <SessionCategoryPicker/>
        {/* <StartButton/> */}
      </MainContentLayout>
      {
          isSectionDisplayed &&
          <TaskContentLayout>
          
            <div className='px-[20px] py-[30px]'>
              <div className="flex flex-row justify-between items-center">

                <h1 className="font-bold text-xl text-text ">
                 Tasks
               </h1>
                          <div className="">
                <button onClick={hideSection}>
                   x
                </button>
                </div>
              </div>
               
                 <FreeSessionTasksList/>
                  <SessionalBasedTasks/>
            </div>
         </TaskContentLayout> 
        
      }

      
    </div> 
  </>
 
  )
}

export default App
