import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import SessionTasks from './SessionTasks';
import { faClock, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { usePomodoroSessionContext } from '../../../../hooks/sessionType/usePomodoroSession';

function SessionalBasedTasks() {
  const {selectedSession} =usePomodoroSessionContext();

  return (
    <div className="flex flex-col gap-y-5 py-3">
      <div className='flex flex-col gap-y-3'>
        <div className='flex gap-x-3 items-center'>
          <FontAwesomeIcon icon={faClock} size='xl' className="text-text" />
          <h2 className="text-md text-text font-semibold">Scheduled Tasks</h2>
        </div>

        <p className='text-sm text-text font-normal'>Tasks planned for each pomodoro session</p>
      </div>

      {selectedSession.sessionCount ? (
        Array.from({ length: selectedSession.sessionCount }).map((_, index) => (
          <SessionTasks key={index} sessionId={index + 1} />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
          <FontAwesomeIcon icon={faExclamationCircle} size="6x"  className="text-muted" />
          <p className="text-xl font-semibold text-text max-w-md">
            You don’t have any scheduled tasks yet. <br />
            Set up your Pomodoro sessions to get started!
          </p>
        </div>
      )}
    </div>
  );
}

export default SessionalBasedTasks;
