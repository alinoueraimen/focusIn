
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
    <div className="w-full h-fit flex flex-col gap-y-2 ">
      <div>
        <h1 className="text-xl font-bold text-text capitalize">
          pick a pomodoro session
        </h1>
        <p className="text-text font-sm">choose or create your pomodoro session</p>
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
  />
        ))
       }
        {/* <SessionPicker
          icon={<FontAwesomeIcon icon={faHourglassHalf} size="2x" />}
          label="dev"
          workDuration={3}
          sessionCount={3}
          shortBreak={1}
          longBreak={2}
        />
        <SessionPicker
          icon={<FontAwesomeIcon icon={faCoffee} size="2x" />}
          label="classic"
          workDuration={25}
          sessionCount={5}
          shortBreak={5}
          longBreak={15}
        />

        {customSessions.map((item, index) => {
          if(item &&item.iconObject && item.icon && item.title && item.longBreak && item.sessionCount && item.shortBreak && item.workDuration){
              return(
             <SessionPicker
            key={index}
            icon={<FontAwesomeIcon icon={item.iconObject } size="2x" />}
            label={item.title ?? ''}
            workDuration={item.workDuration}
            sessionCount={item.sessionCount}
            shortBreak={item.shortBreak}
            longBreak={item.longBreak}
          />
          )
          }})} */}

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
