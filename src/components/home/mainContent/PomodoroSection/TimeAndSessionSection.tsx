
import PomodoroTimer from './Elements/Timer'
import SessionDot from './Elements/SessionDot'
import { usePomodoroContext } from '../../../../hooks/pomodoro/pomodoroContext'

function TimeAndSessionSection() {
 const {timeLeft,settings,sessionsCompleted} = usePomodoroContext();

  return (
    <div className='h-[40%] 
    w-full flex flex-col gap-y-3 items-center '>
    <PomodoroTimer timeLeft={timeLeft}/>
    <div className='w-full h-fit flex justify-center gap-x-3'>
       {Array.from({length:settings.sessionCount ?? 0}).map((_,index)=>(
        <SessionDot isCompleted={sessionsCompleted > index} key={index}/>
       ))}
    </div>
    </div>
  )
}

export default TimeAndSessionSection