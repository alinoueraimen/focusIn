
import { usePomodoroContext } from '../../../../hooks/pomodoro/pomodoroContext'
import SessionPicker from './Elements/SessionPicker'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlus,
} from '@fortawesome/free-solid-svg-icons'
import { usePomodoroSessionContext as usePomodoroSession,getIconElement } from '../../../../hooks/sessionType/usePomodoroSession'

function SessionCategoryPicker() {
  const {  openCustomSessionModal } = usePomodoroContext()
  const {sessions} = usePomodoroSession();
  return (
    <div className="w-full h-fit flex flex-col gap-y-2 capitalize">
      <div className="w-full h-fit">
        <h1 className="text-xl font-bold text-text capitalize">
          choose your focus mode
        </h1>
        <div className='flex flex-col   gap-y-0 text-text '>
          <p >Each mode has different work & break intervals.pick one that fits your style</p>
        
        </div>
        
      </div>

      <div className="flex xl:gap-x-5 lg:gap-x-5 md:gap-x-5 sm:gap-x-5 gap-x-3 overflow-x-auto scroll-smooth pb-4">
       {
        sessions.map((item,index)=>(
           <SessionPicker
    key={index}
    id={item.id}
    icon={item.icon}
    iconElement={<FontAwesomeIcon icon={getIconElement(item.icon)} size="2x" />}
    title={item.title ?? ''}
    workDuration={item.workDuration}
    sessionCount={item.sessionCount}
    shortBreak={item.shortBreak}
    longBreak={item.longBreak}
    isSelected={item.isSelected}
  />
        ))
       }
    
        <button
          
          className="flex flex-col items-center justify-center rounded-xl w-[80px] min-w-[72px] h-full
                     border-2 border-dashed transition-all duration-300 ease-in-out group hover:bg-[#B5D3C3]
                     hover:cursor-pointer border-[#A3C4A8] bg-[#F7FAF8] text-[#6B8F72]"
          
          onClick={openCustomSessionModal}
          title="Add session"
        >
          <FontAwesomeIcon icon={faPlus} size="lg" />
        </button>
      </div>
    </div>
  )
}

export default SessionCategoryPicker
