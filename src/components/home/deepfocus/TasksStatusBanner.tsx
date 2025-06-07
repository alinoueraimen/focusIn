import { usePomodoroContext } from "../../../hooks/pomodoro/pomodoroContext";
import { usePomodoroSessionContext } from "../../../hooks/sessionType/usePomodoroSession";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCoffee } from "@fortawesome/free-solid-svg-icons";

function TasksStatusBanner() {
  const { currentSession, isBreak, isFinished } = usePomodoroContext();
  const { selectedSession } = usePomodoroSessionContext();

  if (isFinished) return null;

  return (
    <div className="w-full max-w-[220px] bg-white shadow-md rounded-xl px-4 py-2  flex items-center gap-3 mb-4">
      <FontAwesomeIcon
        icon={isBreak ? faCoffee : faClock}
        className={`text-xl text-text`}
      />
      {isBreak ? (
        <div className="text-sm font-medium text-gray-600">Break Time</div>
      ) : (
        <div className="flex justify-between items-center w-full">
          <span className="text-sm font-medium text-gray-800">Session</span>
          <div className="flex flex-col items-end">
            <span className="text-sm font-semibold text-gray-900">
              {currentSession}/{selectedSession.sessionCount}
            </span>
            <span className="text-[11px] text-gray-500">Pomodoro</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default TasksStatusBanner;
