

type sessionDotPropsType = {
  isCompleted : boolean  
} 

function SessionDot( {isCompleted} : sessionDotPropsType) {
  return (
    <div className={`w-[5%] aspect-square ${isCompleted ? 'bg-black' : 'bg-container'}
    rounded-full`}>

            </div>
  )
}

export default SessionDot