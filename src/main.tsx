import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TaskManagementProvider } from './hooks/taskManagement/taskManagementContext.tsx'
import { PomodoroProvider } from './hooks/pomodoro/pomodoroContext.tsx'
import TasksList from './test/TasksList.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <PomodoroProvider>
      <TaskManagementProvider>
       <TasksList />
       </TaskManagementProvider>
      </PomodoroProvider>
    
  </StrictMode>,
)
