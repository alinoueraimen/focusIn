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
            className="w-full sm:w-1/3 h-20 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl shadow-lg transform transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-400"
            onClick={handlePick}
        >
            {label}
        </button>
    )
}

export default SessionPicker
