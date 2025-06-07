
import { usePomodoroContext } from '../../../hooks/pomodoro/pomodoroContext'

function CompletionSection() {
  const { isFinished,handleBackToMainPage } = usePomodoroContext();
  if (!isFinished) return null;

  return (
    <div className="flex flex-col items-center justify-center h-full w-fit text-text text-center px-4 gap-y-3">
      <h1 className="text-5xl font-semibold mb-2">You did it!</h1>
      <p>Every session you finished brings you closer to your goals.</p>
      <button onClick={handleBackToMainPage} title="back to home" className="w-full h-fit p-3 rounded-lg bg-primary text-white text-xl hover:cursor-pointer">
        back to home
      </button>
    </div>
  );
}

export default CompletionSection;
