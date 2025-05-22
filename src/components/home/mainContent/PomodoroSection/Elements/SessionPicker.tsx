import React from 'react'
import { usePomodoroContext } from '../../../../../hooks/pomodoro/pomodoroContext'
import { PomodoroSettings } from '../../../../../types'
import { Clock, Coffee, Bed, ListOrdered } from 'lucide-react'

interface SessionPickerType {
  icon: React.ReactNode,
  label: string,
  sessionCount: number,
  workDuration: number,
  shortBreak: number,
  longBreak: number
}

function SessionPicker({ icon, label, sessionCount, shortBreak, longBreak, workDuration }: SessionPickerType) {
  const { updateSetting } = usePomodoroContext()

  const handlePick = () => {
    const settingsPreference: PomodoroSettings = {
      sessionCount,
      workDuration,
      shortBreak,
      longBreak,
    }
    Object.entries(settingsPreference).forEach(([key, value]) => {
      updateSetting(key as keyof PomodoroSettings, value as number);
    });
  }

  return (
    <button
      className="w-full  h-fit px-6 py-4 bg-secondary rounded-lg text-text font-semibold 
                 flex flex-col items-center justify-between
                 hover:cursor-pointer
                 "
      onClick={handlePick}
    >
      <div className="flex flex-col items-center justify-center aspect-square w-12">
        {icon}
        <h3 className="text-lg mt-2">{label}</h3>
      </div>

      <div className="w-full flex justify-evenly">
        <div className="flex flex-col gap-1 text-xs">
          <div className="flex items-center gap-x-1">
            <ListOrdered className="w-4 h-4" />
            <p>{sessionCount} sessions</p>
          </div>
          <div className="flex items-center gap-x-1">
            <Clock className="w-4 h-4" />
            <p>{workDuration} min</p>
          </div>
        </div>

        <div className="flex flex-col gap-1 text-xs">
          <div className="flex items-center gap-x-1">
            <Coffee className="w-4 h-4" />
            <p>{shortBreak} min</p>
          </div>
          <div className="flex items-center gap-x-1">
            <Bed className="w-4 h-4" />
            <p>{longBreak} min</p>
          </div>
        </div>
      </div>
    </button>
  )
}

export default SessionPicker
