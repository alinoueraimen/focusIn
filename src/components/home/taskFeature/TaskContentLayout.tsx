import React from 'react'

type TaskContentLayoutProp =  {
    children : React.ReactNode
}

function TaskContentLayout({children} : TaskContentLayoutProp) {
  return (
    <div className="
        w-[30%]
        h-full 
        bg-container
        flex
        flex-col
        ">
          {children}
        </div>

  )
}

export default TaskContentLayout