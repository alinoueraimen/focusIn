import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TaskManagementProvider } from './hooks/taskManagement/taskManagementContext.tsx'
import { PomodoroProvider } from './hooks/pomodoro/pomodoroContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <PomodoroProvider>
      <TaskManagementProvider>
       <App/>
       </TaskManagementProvider>
      </PomodoroProvider>
    
  </StrictMode>,
)
