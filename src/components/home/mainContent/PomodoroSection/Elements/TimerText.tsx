import { usePomodoroContext } from "../../../../../hooks/pomodoro/pomodoroContext";
import useUtils from "../../../../../utils/useUtils";

interface TimerTextProps {
  text : string
}
function TimerText({ text }: TimerTextProps) {
  const { formatTime } = useUtils();
  const { timeLeft, stopPomodoro } = usePomodoroContext();

  return (
    <button
      onClick={() => stopPomodoro()}
      className="hover:cursor-pointer max-w-full text-center px-2"
    >
      <h1 className="text-text font-semibold text-[40px] leading-tight break-words">
        {formatTime(timeLeft)}
      </h1>
      <p className="text-text text-sm font-normal leading-snug break-words">
        {text}
      </p>
    </button>
  );
}
export default TimerText
