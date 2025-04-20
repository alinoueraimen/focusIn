import React from 'react'

interface SessionDotType {
  isCompleted : boolean
}

function SessionDot({isCompleted} : SessionDotType) {
  console.log('is Completed :',isCompleted)
  return (
    <div className={`w-[5%] aspect-square ${isCompleted ? 'bg-black' : 'bg-container'}
    rounded-full`}>

            </div>
  )
}

export default SessionDot