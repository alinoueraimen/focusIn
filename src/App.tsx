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
import { PomodoroProvider } from './hooks/pomodoro/pomodoroContext'

function App() {
  // const [count, setCount] = useState(0)

  return (<>
  <PomodoroProvider>
  <div className="w-screen h-screen flex flex-row px-[40px] py-[30px] justify-between gap-x-[54px]">
        <nav className='
        h-full 
        w-[100px] bg-container'>

        </nav>
      <MainContentLayout 
      >
        <Profile/>
        <HeaderSection/>
        <TimeAndSessionSection/>
        <SessionCategoryPicker/>
        <StartButton/>
      </MainContentLayout>
        <div className="
        w-[30%]
        h-full 
        bg-container
        flex
        ">
        </div>
    </div>
  </PomodoroProvider>
   
  </>
  
  )
}

export default App
