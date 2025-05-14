import React, { useState } from 'react';
import { usePomodoroContext } from '../../../../hooks/pomodoro/pomodoroContext';

function AddCustomSessionModal() {
  const { isAddCustomSessionModulDisplay,submitCustomSession,closeCustomSessionModal } = usePomodoroContext();

  // State untuk menyimpan nilai input
  const [workDuration, setWorkDuration] = useState(25);  // Default 25 menit
  const [sessionCount, setSessionCount] = useState(4);    // Default 4 sesi
  const [shortBreak, setShortBreak] = useState(5);        // Default 5 menit
  const [longBreak, setLongBreak] = useState(15);         // Default 15 menit

  // Fungsi untuk menangani perubahan input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const value = e.target.value;
    switch (type) {
      case 'workDuration':
        setWorkDuration(Number(value));
        break;
      case 'sessionCount':
        setSessionCount(Number(value));
        break;
      case 'shortBreak':
        setShortBreak(Number(value));
        break;
      case 'longBreak':
        setLongBreak(Number(value));
        break;
      default:
        break;
    }
  };
  const handleSubmit=(e : React.ReactHTMLElement<HTMLFormElement>)=>{
    e.preventDefault();
    const object = {
        workDuration,
        sessionCount,
        shortBreak,
        longBreak
    }
    submitCustomSession(object)
    closeCustomSessionModal();
  }
  if (isAddCustomSessionModulDisplay) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-300">
        <div className="bg-background rounded-lg p-6 shadow-lg w-[90%] max-w-md transform transition-transform duration-300 scale-100">
          <h1 className="font-medium text-lg text-text mb-6 text-center">Customize Your Session</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Work Duration */}
            <div className="flex flex-col items-center">
              <label htmlFor="workDuration" className="block text-text mb-2 text-sm">Work Duration</label>
              <div className="flex items-center gap-3">
                <span className="text-primary font-semibold">5m</span>
                <input
                  id="workDuration"
                  type="range"
                  min="5"
                  max="60"
                  step="5"
                  value={workDuration}
                  onChange={(e) => handleInputChange(e, 'workDuration')}
                  className="w-full accent-primary"
                />
                <span className="text-primary font-semibold">{workDuration}m</span>
              </div>
            </div>
      
            {/* Session Count */}
            <div className="flex flex-col items-center">
              <label htmlFor="sessionCount" className="block text-text mb-2 text-sm">Session Count</label>
              <div className="flex items-center gap-3">
                <span className="text-primary font-semibold">1</span>
                <input
                  id="sessionCount"
                  type="number"
                  min="1"
                  max="10"
                  value={sessionCount}
                  onChange={(e) => handleInputChange(e, 'sessionCount')}
                  className="w-full text-center p-2 border-2 border-text rounded-md"
                />
                <span className="text-primary font-semibold">10</span>
              </div>
            </div>
      
            {/* Short Break Duration */}
            <div className="flex flex-col items-center">
              <label htmlFor="shortBreak" className="block text-text mb-2 text-sm">Short Break</label>
              <div className="flex items-center gap-3">
                <span className="text-primary font-semibold">1m</span>
                <input
                  id="shortBreak"
                  type="range"
                  min="1"
                  max="15"
                  step="1"
                  value={shortBreak}
                  onChange={(e) => handleInputChange(e, 'shortBreak')}
                  className="w-full accent-primary"
                />
                <span className="text-primary font-semibold">{shortBreak}m</span>
              </div>
            </div>
      
            {/* Long Break Duration */}
            <div className="flex flex-col items-center">
              <label htmlFor="longBreak" className="block text-text mb-2 text-sm">Long Break</label>
              <div className="flex items-center gap-3">
                <span className="text-primary font-semibold">5m</span>
                <input
                  id="longBreak"
                  type="range"
                  min="5"
                  max="30"
                  step="5"
                  value={longBreak}
                  onChange={(e) => handleInputChange(e, 'longBreak')}
                  className="w-full accent-primary"
                />
                <span className="text-primary font-semibold">{longBreak}m</span>
              </div>
            </div>
      
            {/* Submit Button */}
            <div className="flex justify-center">
              <button className="w-full bg-primary text-white p-3 rounded-md font-semibold capitalize shadow-md hover:scale-105 transition-all" title="add" type="submit">
                Add Custom Session
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return null;
}

export default AddCustomSessionModal;
