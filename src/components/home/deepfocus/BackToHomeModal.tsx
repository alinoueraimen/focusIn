
import { usePomodoroContext } from '../../../hooks/pomodoro/pomodoroContext'

function BackToHomeModal() {
    const {isBackToHomeModalDisplayed,setIsBackToHomeModalDisplayed,handleBackToMainPage} = usePomodoroContext();
    const closeModal=()=>{
        setIsBackToHomeModalDisplayed(false)
    }
    if(isBackToHomeModalDisplayed)
        
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-300"
    onClick={closeModal}
    >
      <div className="bg-background rounded-lg p-6 shadow-lg w-[90%] max-w-md transform transition-transform duration-300 scale-100 flex flex-col space-y-6">
        
        {/* Header & Message */}
        <div>
          <h1 className="font-semibold text-lg text-text mb-2">Exit Deep Focus Mode?</h1>
          <p className="text-sm text-text leading-relaxed">
            Are you sure you want to exit Deep Focus Mode? Your session will be paused and progress may not be saved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between gap-x-4">
          <div className="flex w-full rounded-lg bg-primary justify-center items-center p-3 hover:cursor-pointer transition hover:opacity-90">
            <span className="text-white font-semibold capitalize"
            onClick={()=>{setIsBackToHomeModalDisplayed(false)}}
            >Stay Focused</span>
          </div>
          <div className="flex w-full rounded-lg bg-[#FFCDD2] justify-center items-center p-3 hover:cursor-pointer transition hover:opacity-90"
          onClick={handleBackToMainPage}>
            <span className="text-white font-semibold capitalize">Exit Anyway</span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default BackToHomeModal
