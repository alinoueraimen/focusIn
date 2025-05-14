import React from 'react'
import NewTaskButton from './NewTasksToggle'
import SessionTasks from './SessionTasks'
function SessionalBasedTasks() {
  return (
    <>
    <div className="flex flex-col gap-y-5  py-3 ">
                  <h2 className="text-md text-text font-semibold">Session Based Task</h2>
                    <SessionTasks sessionId={1} />
                    <SessionTasks sessionId={2} />
                    <SessionTasks sessionId={3} />
                  </div>
    </>
  )
}

export default SessionalBasedTasks