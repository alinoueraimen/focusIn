

import SessionDot from './Elements/SessionDot'
import { usePomodoroContext } from '../../../../hooks/pomodoro/pomodoroContext'
import React from 'react';
import { usePomodoroSessionContext } from '../../../../hooks/sessionType/usePomodoroSession';


function TimeAndSessionSection({ timerVariant }: { timerVariant: React.ReactNode }) {
  const { dotsStatus } = usePomodoroContext();
  const { selectedSession } = usePomodoroSessionContext();

  return (
    <div className="xl:min-w-[300px]  lg:min-w-[300px] md:min-w-[300px] sm:min-w-[300px] w-full flex flex-col gap-y-3 items-center h-fit justify-between   h-fit">
      {timerVariant}
      <div className="w-full h-fit flex justify-center gap-x-3">
        {Array.from({ length: selectedSession.sessionCount ?? 0 }).map((_, index) => (
          <SessionDot isCompleted={dotsStatus[index]} key={index} />
        ))}
      </div>
    </div>
  );
}


export default TimeAndSessionSection