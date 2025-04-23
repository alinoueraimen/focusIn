import React from 'react'
import { usePomodoroContext } from '../../../../../hooks/pomodoro/pomodoroContext'
import { PomodoroSettings } from '../../../../../types'

interface SessionPickerType {
    label: string,
    sessionCount: number,
    workDuration: number,
    shortBreak: number,
    longBreak: number
}

function SessionPicker({ label, sessionCount, shortBreak, longBreak, workDuration }: SessionPickerType) {
    const { updateSetting } = usePomodoroContext()

    const handlePick = () => {
        const settingsPreference: PomodoroSettings = {
            sessionCount,
            workDuration,
            shortBreak,
            longBreak,
        }
        Object.entries(settingsPreference).forEach(([key, value]) => {
            updateSetting(key as keyof PomodoroSettings, value);
        });
    }

    return (
        <button
            className="w-full sm:w-1/3 h-20 px-8 py-4 bg-secondary rounded-md text-text font-semibold "
            onClick={handlePick}
        >
            {label}
        </button>
    )
}

export default SessionPicker
