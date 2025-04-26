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
import { TaskManagementProvider } from './hooks/taskManagement/taskManagementContext'
import TaskContentLayout from './components/home/taskFeature/taskContentLayout'
import TaskManagementContent from './components/home/taskFeature/TaskManagementContent'
import SessionalTaskSection from './components/home/taskFeature/SessionalTaskSection'
import TasksList from './components/home/taskFeature/TasksList'
import AddTasksModal from './components/home/taskFeature/AddTasksModal'
function App() {
  
  // const [count, setCount] = useState(0)
  const {isFocused} =usePomodoroContext();
  if(isFocused){
    return(
      <>
      <div className="w-screen h-screen flex flex-row justify-center  pt-[5%]  bg-background ">
        <TimeAndSessionSection/>
      </div>
      </>
    )
  }

  return (<>
  
  <AddTasksModal/>
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
          <SessionalTaskSection/>
          <TasksList/>          
       </TaskContentLayout>
    </div> 
  </>
  
  )
}

export default App
