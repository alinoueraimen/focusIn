
import PomodoroTimer from './Elements/Timer'
import SessionDot from './Elements/SessionDot'
import { usePomodoroContext } from '../../../../hooks/pomodoro/pomodoroContext'

function TimeAndSessionSection() {
 const {dotsStatus,settings,timeLeft} = usePomodoroContext();

  return (
    <div className='h-fit
    w-full flex flex-col gap-y-3 items-center px-[20px] py-[30px]'>
    <PomodoroTimer timeLeft={timeLeft}/>
    <div className='w-full h-fit flex justify-center gap-x-3'>
       {Array.from({length:settings.sessionCount ?? 0}).map((_,index)=>(
        <SessionDot isCompleted={dotsStatus[index]} key={index}/>
       ))}
    </div>
    </div>
  )
}

export default TimeAndSessionSection