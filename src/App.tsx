import { useState,useEffect } from 'react'
import './App.css'
import PomodoroTimer from './components/home/mainContent/PomodoroSection/Elements/Timer.tsx'

import MainContentLayout from './components/home/mainContent/MainContentLayout'



import TimeAndSessionSection from './components/home/mainContent/PomodoroSection/TimeAndSessionSection'
import SessionCategoryPicker from './components/home/mainContent/PomodoroSection/SessionsGroup'


import { usePomodoroContext } from './hooks/pomodoro/pomodoroContext'
import {  useTaskManagementContext } from './hooks/taskManagement/taskManagementContext'
import TaskContentLayout from './components/home/taskFeature/TaskContentLayout'

import AddTasksModal from './components/home/taskFeature/AddTasksModal'

import FreeSessionTasksList from './components/home/taskFeature/v2/FreeSessionTasksList.tsx'



import SessionalBasedTasks from './components/home/taskFeature/v2/SessionalBasedTasks.tsx'

import AddCustomSessionModal from './components/home/mainContent/PomodoroSection/addCustomSession.tsx'
import HourglassTimer from './test/HourGlass.tsx'
import DeepFocusSection from './components/home/deepfocus/DeepFocusSection.tsx'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft,faCaretRight,faXmark,faPlus } from '@fortawesome/free-solid-svg-icons';
import { usePomodoroSessionContext } from './hooks/sessionType/usePomodoroSession.tsx'

function App() {
  
 
  const [currentTimerVariant, setCurrentTimerVariant] = useState<number>(0);
  
  const isMobile = () => {
    // Cek lebar layar DAN apakah perangkat mendukung touch (opsional)
    return window.innerWidth <= 768 && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
};
  const timersVariants = [
    <TimeAndSessionSection timerVariant={<PomodoroTimer />} key="time-session" />,
    <TimeAndSessionSection timerVariant={<HourglassTimer/>} key="time-session" />,
  ];
 const {selectedSession}= usePomodoroSessionContext();
  const {isFocused} =usePomodoroContext();
  const {isSectionDisplayed,showSection,hideSection} = useTaskManagementContext();



   // Fungsi pindah ke komponen berikutnya
   const handleNext = () => {
    setCurrentTimerVariant((prev) => (prev + 1) % timersVariants.length);
  };

  // Fungsi pindah ke komponen sebelumnya
  const handlePrev = () => {
    setCurrentTimerVariant((prev) => (prev - 1 + timersVariants.length) % timersVariants.length);
  };
  
useEffect(() => {
  if (isSectionDisplayed) {
    // Saat section dibuka, push state ke history
    history.pushState({ sectionOpen: true }, "");
  }

  const handlePopState = () => {
    if (isSectionDisplayed) {
      // Kalau section lagi tampil, pencet tombol back akan menutup section
      hideSection();
    }
  };

  window.addEventListener('popstate', handlePopState);

  return () => {
    window.removeEventListener('popstate', handlePopState);
  };
   }, [isSectionDisplayed]);
   useEffect(() => {
     // Cegah keluar langsung di load awal (buat initial state)
     history.replaceState({}, "");
   }, [])
  // if(isFinished){
  //   return(
  //     <>
  //       <div className="bg-background w-screen h-screen 
  //       flex justify-center items-center
  //       overflow-y-hidden
  //       "
        
  //       >
  //         <CompletedSection/>
          
  //       </div>
  //     </>
  //   )
  // }
  if(isFocused){
    return(
      <>
        <DeepFocusSection/>
      </>
    )
  }
  
  
 
  return (
  <>
  {!isMobile() && <AddTasksModal/>}
  <AddCustomSessionModal/>
  {isFocused}
  <div className="w-screen h-screen flex flex-row justify-between gap-x-[54px] bg-background overflow-x-hidden">
      <MainContentLayout 
      >
        <div className="flex flex-col  relative w-full xl:items-center md:items-center sm:items-center justify-center h-full  ">
          {
            selectedSession.sessionCount ?  <div className="absolute bottom-3 right-0 flex gap-x-3 items-center"> 
            <p className="capitalize font-light text-text text-sm">set tasks</p>
              <div onClick={showSection} className=" w-10 h-10 rounded-full grid place-items-center bg-accent font-bold text-white hover:cursor-pointer">
           <FontAwesomeIcon icon={faPlus} size="xl" className="font-bold"/>
         </div>
          </div> : <></>
          }
         
           
      <div className="flex justify-center items-center gap-4 w-full  xl:w-fit lg:w-fit sm:w-fit ">
        <button onClick={handlePrev} className="h-fit w-fit" title="swipe right">
          <FontAwesomeIcon icon={faCaretLeft} size="5x" className="text-text"/> {/* panah kiri */}
        </button>

          {timersVariants[currentTimerVariant
          ]}
        <button onClick={handleNext} className="h-fit w-fit" title="swipe right">
          <FontAwesomeIcon icon={faCaretRight} size="5x" className="text-text"/>
        </button>
      </div>
    </div>
        <SessionCategoryPicker/>
        {/* <StartButton/> */}
      </MainContentLayout>
      {
          isSectionDisplayed &&
          <TaskContentLayout>
            {isMobile() && <AddTasksModal/>}
            <div className='px-[20px] py-[30px]'>
              <div className="flex flex-row justify-between items-center">

                <h1 className="font-bold text-2xl text-text ">
                 Tasks
               </h1>
                         
                <div onClick={hideSection} className="w-10 h-10 rounded-lg  grid place-items-center" title="hide section">
                   <FontAwesomeIcon icon={faXmark} className="text-text font-semibold" size='xl'/>
                </div>
                
              </div>
               
                 <FreeSessionTasksList/>
                 {/* <div className="w-full border border-3 border-text rounded-lg"></div> */}
                  <SessionalBasedTasks/>
            </div>
         </TaskContentLayout> 
      }

      
    </div> 
  </>
 
  )
}

export default App