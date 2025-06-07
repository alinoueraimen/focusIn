import  React, { useState,useRef } from 'react';
import { usePomodoroContext } from '../../../../hooks/pomodoro/pomodoroContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faClock, 
  faBook, 
  faLaptop, 
  faBullseye, 
  faFire, 
  faBolt, 
  faPalette, 
  faRunning, 
  faTree, 
  faLightbulb,
  faMusic,
  faCoffee
} from '@fortawesome/free-solid-svg-icons';
 import { PomodoroSessionType, usePomodoroSessionContext as usePomodoroSession } from '../../../../hooks/sessionType/usePomodoroSession';
import useUtils from '../../../../utils/useUtils';
function AddCustomSessionModal() {
  const inputRef = useRef<HTMLInputElement>(null)

  const { isAddCustomSessionModulDisplay,  closeCustomSessionModal } = usePomodoroContext();
  const {addSession} = usePomodoroSession()
  const {generateId} = useUtils();
  // State untuk form
  const [sessionTitle, setSessionTitle] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(faClock);
  const [workDuration, setWorkDuration] = useState(25);
  const [sessionCount, setSessionCount] = useState(4);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(15);

  // Pilihan icon FontAwesome
  const iconOptions = [
    { icon: faClock, name: 'clock' },
    { icon: faBook, name: 'book' },
    { icon: faLaptop, name: 'laptop' },
    { icon: faBullseye, name: 'bullseye' },
    { icon: faFire, name: 'fire' },
    { icon: faBolt, name: 'bolt' },
    { icon: faPalette, name: 'palette' },
    { icon: faRunning, name: 'running' },
    { icon: faTree, name: 'tree' },
    { icon: faLightbulb, name: 'lightbulb' },
    { icon: faMusic, name: 'music' },
    { icon: faCoffee, name: 'coffee' }
  ];

  const handleSubmit = (e : React.FormEvent) => {
    e.preventDefault();
    const customSession : PomodoroSessionType = {
      id:generateId(),
      title: sessionTitle,
      icon: selectedIcon.iconName || 'clock', // Simpan nama icon sebagai string
      workDuration,
      sessionCount,
      shortBreak,
      longBreak
    };

    addSession(customSession);
    closeCustomSessionModal();
    
    // Reset form
    setSessionTitle('');
    setSelectedIcon(faClock);
    setWorkDuration(25);
    setSessionCount(4);
    setShortBreak(5);
    setLongBreak(15);
  };
  const handleFocus = ( )=>{
    inputRef.current?.scrollIntoView({
      behavior:'smooth',
      block:'center'
    })
  }
  if (!isAddCustomSessionModulDisplay) return null;

  return (
    <div className="fixed bottom-0 inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background rounded-xl p-6 shadow-xl w-[90%] max-w-sm">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-text">New Session</h2>
          <button 
            onClick={closeCustomSessionModal}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Session Title */}
          <div>
            <label className="block text-text text-sm font-medium mb-2">Session Name</label>
            <input
              type="text"
              value={sessionTitle}
              onChange={(e) => setSessionTitle(e.target.value)}
              onFocus={handleFocus}
              placeholder="e.g., Deep Work, Study Time"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {/* Icon Selection */}
          <div>
            <label className="block text-text text-sm font-medium mb-2">Choose Icon</label>
            <div className="grid grid-cols-4 gap-2">
              {iconOptions.map((iconOption) => (
                <button
                  key={iconOption.name}
                  type="button"
                  title="icon option"
                  onClick={() => setSelectedIcon(iconOption.icon)}
                  className={`p-3 rounded-lg border-2 hover:scale-105 transition-all flex items-center justify-center ${
                    selectedIcon === iconOption.icon 
                      ? 'border-primary bg-primary/10' 
                      : 'border-gray-200 hover:border-primary'
                  }`}
                >
                  <FontAwesomeIcon 
                    icon={iconOption.icon} 
                    size="lg"
                    className={selectedIcon === iconOption.icon ? 'text-primary' : 'text-gray-600'}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Simplified Settings */}
          <div className="space-y-4">
            {/* Work Duration */}
            <div className="flex justify-between items-center">
              <span className="text-text text-sm">Work</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setWorkDuration(Math.max(5, workDuration - 5))}
                  className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                >
                  -
                </button>
                <span className="text-primary font-semibold w-12 text-center">{workDuration}m</span>
                <button
                  type="button"
                  onClick={() => setWorkDuration(Math.min(60, workDuration + 5))}
                  className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* Sessions */}
            <div className="flex justify-between items-center">
              <span className="text-text text-sm">Sessions</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSessionCount(Math.max(1, sessionCount - 1))}
                  className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                >
                  -
                </button>
                <span className="text-primary font-semibold w-12 text-center">{sessionCount}</span>
                <button
                  type="button"
                  onClick={() => setSessionCount(Math.min(10, sessionCount + 1))}
                  className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* Short Break */}
            <div className="flex justify-between items-center">
              <span className="text-text text-sm">Short Break</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShortBreak(Math.max(1, shortBreak - 1))}
                  className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                >
                  -
                </button>
                <span className="text-primary font-semibold w-12 text-center">{shortBreak}m</span>
                <button
                  type="button"
                  onClick={() => setShortBreak(Math.min(15, shortBreak + 1))}
                  className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* Long Break */}
            <div className="flex justify-between items-center">
              <span className="text-text text-sm">Long Break</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setLongBreak(Math.max(5, longBreak - 5))}
                  className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                >
                  -
                </button>
                <span className="text-primary font-semibold w-12 text-center">{longBreak}m</span>
                <button
                  type="button"
                  onClick={() => setLongBreak(Math.min(30, longBreak + 5))}
                  className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Create Session
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCustomSessionModal;