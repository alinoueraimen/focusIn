import React, { useEffect, useState } from 'react';
import { usePomodoroContext } from '../../../../../hooks/pomodoro/pomodoroContext';
import { Play, Pause } from 'lucide-react';
import TimerText from './TimerText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

function PomodoroTimer() {
  const [displayedElement, setDisplayedElement] = useState<React.ReactNode>();
  const {
    initialWorkTime,
    initialBreakTime,
    isWorking,
    currentCondition,
    isRunning,
    isFinished,
    isPause,
    startPomodoro,
    timeLeft,
    
  } = usePomodoroContext();

  useEffect(() => {
  if (!isFinished) {
    if (isRunning) {
      if (!isWorking) {
        // Saat sedang break
        setDisplayedElement(<TimerText text="🍵 Break time!." />);
      } else {
        // Saat sedang bekerja
        switch (true) {
          case currentCondition.isQuarterTime:
            setDisplayedElement(<TimerText text="💡 25% done — keep going!" />);
            break;
          case currentCondition.isHalfTime:
            setDisplayedElement(<TimerText text="🔔 Halftime — great job!" />);
            break;
          case currentCondition.isQuarterBreakTime:
            setDisplayedElement(<TimerText text="☕ Almost break time!" />);
            break;
          default:
            setDisplayedElement(<TimerText text="⌛ Stay focused, you got this!" />);
            break;
        }
      }
    } else {
      if (isPause) {
        setDisplayedElement(
          <button
            onClick={startPomodoro}
            title="Resume"
            className="w-[30%] h-[30%] hover:cursor-pointer"
          >
            <Pause className="w-full h-full text-text" />
          </button>
        );
      } else {
        setDisplayedElement(
          <button
            onClick={startPomodoro}
            title="Start"
            className="w-[30%] h-[30%] hover:cursor-pointer"
          >
            <Play className="w-full h-full text-text" />
          </button>
        );
      }
    }
  } else {
    setDisplayedElement(
      <button title="Done" className="w-[30%] h-[30%] hover:cursor-pointer">
        <FontAwesomeIcon icon={faCheck} size="2x"className="w-full h-full text-text" />
      </button>
    );
  }
}, [currentCondition, isRunning, isPause, isFinished, isWorking]);


  return (
    <div className="h-fit aspect-square relative">
      <svg viewBox="0 0 100 100" className="w-full h-fit">
        <circle cx="50" cy="50" r="40" stroke="#D9D9D9" strokeWidth="12" fill="none" />
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="#A3C4A8"
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${2 * Math.PI * 40}`}
          strokeDashoffset={`${
  isFinished
    ? 0
    : 2 * Math.PI * 40 * (1 - timeLeft / (isWorking ? initialWorkTime : initialBreakTime))
}`}

          className="transform -rotate-90"
          style={{ transformOrigin: '50% 50%' }}
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center text-center">
        {displayedElement}
      </div>
    </div>
  );
}

export default PomodoroTimer;
