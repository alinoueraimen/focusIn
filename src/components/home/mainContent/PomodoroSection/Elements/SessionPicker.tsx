import  { useState, useRef,useEffect, JSX } from 'react'
import { PomodoroSessionType } from '../../../../../hooks/sessionType/usePomodoroSession'
import { usePomodoroSessionContext as usePomodoroSession } from '../../../../../hooks/sessionType/usePomodoroSession'

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faClock,
  faMugHot,
  faBed,
  faListOl,
  faTrash,
  faPen
} from '@fortawesome/free-solid-svg-icons'

interface SessionPickerProps extends PomodoroSessionType {
  iconElement: JSX.Element;
}

function SessionPicker({
  id,
  icon,
  title,
  iconElement,
  sessionCount,
  shortBreak,
  longBreak,
  workDuration,
  isSelected
}: SessionPickerProps) {
  
  const { selectSession,deleteSession } = usePomodoroSession();
  

  const [showSection, setShowSection] = useState(false);
  const longPressTimer = useRef<number | null>(null);
  const longPressTriggered = useRef(false);

  const handlePick = () => {
    
    if (!longPressTriggered.current) {
      selectSession({
        id,
        icon,
        title,
        sessionCount,
        shortBreak,
        longBreak,
        workDuration,
        isSelected
      });
    }
  };

  const startPressTimer = () => {
    longPressTriggered.current = false;
    longPressTimer.current = setTimeout(() => {
      setShowSection(true);
      longPressTriggered.current = true;

      // Trigger getaran jika device support
      if (navigator.vibrate) {
        navigator.vibrate(50); // getar 50ms
      }
    }, 600);
  };

  const cancelPressTimer = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };
  const containerRef = useRef<HTMLButtonElement | null>(null);

useEffect(() => {
  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (
      showSection &&
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setShowSection(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  document.addEventListener('touchstart', handleClickOutside);

  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
    document.removeEventListener('touchstart', handleClickOutside);
  };
}, [showSection]);
  return (
    <button
      disabled={isSelected}
       ref={containerRef}
      onClick={handlePick}
      onMouseDown={startPressTimer}
      onMouseUp={cancelPressTimer}
      onMouseLeave={cancelPressTimer}
      onTouchStart={startPressTimer}
      onTouchEnd={cancelPressTimer}
       onContextMenu={(e) => {
    e.preventDefault();
    setShowSection(true);
  }}
      className={`w-full px-5 py-4 sm:px-6 md:px-8 lg:px-10 rounded-xl bg-secondary text-text font-semibold 
                 flex flex-col gap-5 items-center shadow-sm transition-all hover:cursor-pointer relative ${isSelected &&"border-white border text-white"}`}
    >
      {/* Tombol edit/delete muncul jika showSection true */}
      {showSection && (
        <div
          className="absolute -right-2 top-0 flex flex-col gap-y-2 z-10 animate-fadeIn"
        >
          <button
            title="delete"
            className="bg-white shadow-md text-text rounded-full p-2 hover:bg-red-100 transition"
            onClick={(e) => {
              e.stopPropagation();
              deleteSession(id)
              
            }}
          >
            <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
          </button>
          <button
          title="edit"
            className="bg-white shadow-md text-text rounded-full p-2 hover:bg-blue-100 transition"
            onClick={(e) => {
              e.stopPropagation();
              
              
            }}
          >
            <FontAwesomeIcon icon={faPen} className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Icon & Label */}
      <div className="flex flex-col items-center justify-center text-center">
        <div className="aspect-square w-10">{iconElement}</div>
        <h3 className="text-base mt-2">{title}</h3>
      </div>

      {/* Info Section */}
      <div className="w-full flex flex-col justify-between sm:flex-row sm:justify-evenly gap-4 text-xs sm:text-sm">
        <div className="flex flex-col gap-3 items-start sm:items-center">
          <div className="flex items-center gap-x-1">
            <FontAwesomeIcon icon={faListOl} className="w-4 h-4" />
            <p>{sessionCount} session</p>
          </div>
          <div className="flex items-center gap-x-1 ">
            <FontAwesomeIcon icon={faClock} className="w-4 h-4" />
            <p>{workDuration} min</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 items-start sm:items-center">
          <div className="flex items-center gap-x-1">
            <FontAwesomeIcon icon={faMugHot} className="w-4 h-4" />
            <p>{shortBreak} min</p>
          </div>
          <div className="flex items-center gap-x-1">
            <FontAwesomeIcon icon={faBed} className="w-4 h-4" />
            <p>{longBreak} min</p>
          </div>
        </div>
      </div>
    </button>
  )
}

export default SessionPicker
