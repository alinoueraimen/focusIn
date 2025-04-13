import React, { useState, useEffect } from "react";
import PomodoroSettingsSelector from "../pomodoroSettingsSelector/PomodoroSettingsSelector";
import usePomodoro from "../../hooks/pomodoro/usePomodoro";
import useUtils from "../../utils/useUtils";
const PomodoroTimer: React.FC = () => {
    const {
        settings,
        currentSession,
        isWorking,
        timeLeft,
        isRunning,
        isQuarterTime,
        updateSetting,
        startPomodoro,
        stopPomodoro,
        resetPomodoro
    } = usePomodoro(); 
    const {formatTime} = useUtils();
  return (
    <div className="max-w-xl mx-auto p-4 space-y-6 text-center">
      <h1 className="text-3xl font-bold text-amber-300">🎯 fokusIn - Pomodoro</h1>

      <PomodoroSettingsSelector
        label="Jumlah Sesi"
        options={[2, 4, 8]}
        selected={settings.sessionCount}
        onSelect={(val) => updateSetting("sessionCount", val)}
      />
      <PomodoroSettingsSelector
        label="Durasi Kerja (menit)"
        options={[1, 50, 90]}
        selected={settings.workDuration}
        onSelect={(val) => updateSetting("workDuration", val)}
      />
      <PomodoroSettingsSelector
        label="Istirahat Pendek (menit)"
        options={[1, 10, 15]}
        selected={settings.shortBreak}
        onSelect={(val) => updateSetting("shortBreak", val)}
      />
      <PomodoroSettingsSelector
        label="Istirahat Panjang (menit)"
        options={[2, 15, 30]}
        selected={settings.longBreak}
        onSelect={(val) => updateSetting("longBreak", val)}
      />

      <div className="text-6xl font-mono mt-6">
        {formatTime(timeLeft)}
      </div>
      <div className="text-lg font-medium">
        {
        isQuarterTime ? "ayoo dikit lagiiii !!!" :    
        isRunning ? (isWorking  ? "Kerja 💼" : "Istirahat 💤") : "Siap mulai"
        }
      </div>
      <div className="text-sm text-gray-500">
        Sesi {currentSession} / {settings.sessionCount ?? "-"}
      </div>

      <div className="flex justify-center gap-4 mt-4">
        {!isRunning  ? (
          <button
            onClick={startPomodoro}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl"
          >
            Mulai
          </button>
        ) : (
          <button
            onClick={stopPomodoro}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl"
          >
            Pause
          </button>
        )}
        <button
          onClick={resetPomodoro}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-xl"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
