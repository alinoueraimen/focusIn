import { useState } from 'react'
import './App.css'
import PomodoroTimer from './components/pomodoroTimer/PomodoroTimer'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <PomodoroTimer/>
    </>
  )
}

export default App
