import React from 'react'

import { usePomodoroContext } from '../../../../hooks/pomodoro/pomodoroContext'
import { PomodoroSettings } from '../../../../types'
import SessionPicker from './Elements/SessionPicker'
function SessionCategoryPicker() {
  return (
    <div className='w-full h-[20%] flex flex-row gap-x-5'
    >
      <SessionPicker label="chill" workDuration={20} sessionCount={3} shortBreak={3} longBreak={10}/>         
      <SessionPicker label="dev" workDuration={3} sessionCount={3} shortBreak={1} longBreak={2}/>         
      <SessionPicker label="classic" workDuration={25} sessionCount={5} shortBreak={5} longBreak={15}/>         
    </div>
  )
}

export default SessionCategoryPicker