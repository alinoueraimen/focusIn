import {useEffect} from 'react'

type sessionDotPropsType = {
  isCompleted : boolean  
} 

function SessionDot( {isCompleted} : sessionDotPropsType) {
  useEffect(()=>{
    console.log('isCompleted :',isCompleted)
  })  
  return (
    <div className={`w-[2%] aspect-square ${isCompleted ? 'bg-black' : 'bg-container'}
    rounded-full`}>

            </div>
  )
}

export default SessionDot