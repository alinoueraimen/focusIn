import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TaskManagementProvider } from './hooks/taskManagement/taskManagementContext.tsx'
import { PomodoroProvider } from './hooks/pomodoro/pomodoroContext.tsx'
import { DeepFocusProvider } from './hooks/deepFocus/useDeepFocus.tsx'
import { PomodoroSessionProvider } from './hooks/sessionType/usePomodoroSession.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PomodoroSessionProvider>
          <PomodoroProvider>
      <TaskManagementProvider>
    <DeepFocusProvider>
       <App/>
    </DeepFocusProvider>
       </TaskManagementProvider>
      </PomodoroProvider>
    </PomodoroSessionProvider>
     
     
    
  </StrictMode>,
)
