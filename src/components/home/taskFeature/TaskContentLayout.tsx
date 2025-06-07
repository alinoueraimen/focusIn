import React from 'react'

type TaskContentLayoutProp =  {
    children : React.ReactNode
}

function TaskContentLayout({ children }: TaskContentLayoutProp) {
  return (
    <div
      className="
        w-screen
        md:w-[30%]
        h-full
        bg-background
        flex
        flex-col
        border-l-text
        border-l-2
        md:static
        fixed
        right-0
        top-0
        z-50
        overflow-y-auto
        scroll-smooth
      "
    >
      {children}
    </div>
  );
}

export default TaskContentLayout