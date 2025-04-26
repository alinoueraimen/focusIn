import React from 'react'

type TaskContentLayoutProp =  {
    children : React.ReactNode
}

function TaskContentLayout({children} : TaskContentLayoutProp) {
  return (
    <div className="
        w-[30%]
        h-full 
        bg-background
        flex
        flex-col
        border-l-text
        border-l-2
        ">
          {children}
        </div>

  )
}

export default TaskContentLayout