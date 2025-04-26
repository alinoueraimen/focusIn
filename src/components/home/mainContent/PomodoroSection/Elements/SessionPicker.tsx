import React from 'react'
import { usePomodoroContext } from '../../../../../hooks/pomodoro/pomodoroContext'
import { PomodoroSettings } from '../../../../../types'
import {Zap} from 'lucide-react'
import { Bed,Layers,Coffee,Timer } from 'lucide-react'


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
            className="w-full sm:w-1/3 h-full px-8 py-4 bg-secondary rounded-md text-text font-semibold flex flex-col items-center
            justify-between
            "
            onClick={handlePick}
            title="sprint"
        >
            <div className="flex flex-col items-center justify-center ">
            <Zap/>
            <h3 className="text-lg">2 x 50</h3>
            </div>
            <div className="flex flex-col w-full ">
                <div className="w-[100%] flex justify-between items-center">
                  <div className='flex w-fit h-fit items-center '>
                  <div className="flex items-center
                  gap-x-1">
                  <Timer size ={15}/> 
                  <p className="text-xs font-[350]">50 mnt</p>
                  </div>
                  </div>
                  <p className="mx-auto text-lg font-bold">x</p>
                  <div>
                  <div>
                  <div className="flex items-center
                  gap-x-1
                  "
                  >
                  <Layers size ={15}/> 
                  <p className="text-xs font-[350]">2 session</p>
                  </div>
                  </div>
                  </div>   
                </div>    
                
            </div>
        </button>
    )
}

export default SessionPicker
