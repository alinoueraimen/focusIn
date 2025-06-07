import { useDeepFocusContext } from "../../../hooks/deepFocus/useDeepFocus";
import { usePomodoroContext } from "../../../hooks/pomodoro/pomodoroContext"
import SectionHeader from "./HeaderSection";
import { Check,Target,Clock } from "lucide-react";
function TasksSection(){
    const {isFinished,currentSession} = usePomodoroContext();
    const {missedTasks,expandedSections,generalTasks,upcomingTasks,currentSessionTasks,checkedTasks,
    toggleCheck
    } = useDeepFocusContext();
    // render if its not finish
    if(isFinished)return null
          return (
              <div className="w-[90%] lg:w-[50%] md:w-[50%] xl:w-[50%] h-full bg-slate-50 rounded-tl-2xl rounded-tr-2xl shadow-lg overflow-y-scroll scroll-smooth scroll-bar-thin  ">
        
        {/* Missed Tasks Section */}
        {missedTasks.length > 0 && (
          <>
            <SectionHeader
              title="Missed Tasks"
              icon={
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              }
              count={missedTasks.length}
              sectionKey="missed"
              iconColor="text-red-600"
              textColor="text-red-700"
            />

            {expandedSections.missed && (
              <div className="px-[20px] pb-6">
                {missedTasks.map((item, index) => {
                  const isChecked = checkedTasks.includes(item.id);

                  return (
                    <div
                      key={`missed-${index}`}
                      className={`
                        bg-white rounded-xl w-full min-h-[60px] h-fit my-2 flex items-center px-4 relative transition-all duration-300
                        ${isChecked ? "bg-green-500 sparkle" : ""}
                        border-l-4 border-red-500 bg-red-50
                      `}
                    >
                      <button
                        onClick={() => toggleCheck(item.id)}
                        className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-colors duration-200
                          ${isChecked ? 'bg-green-500 border-green-500' : 'border-red-400'}
                        `}
                      >
                        {isChecked && <Check size={14} color="white" strokeWidth={3} />}
                      </button>

                      <div className="flex-1">
                        <div className="flex flex-col gap-1">
                          <span
                            className={`text-base ${
                              isChecked ? 'line-through text-white' : 'text-slate-700'
                            }`}
                          >
                            {item.content}
                          </span>
                          <span className="text-xs text-red-600 italic">
                            ⚠️ You missed this task from Session {item.sessionId}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
        {/* General Tasks */}
        
          <>
            <SectionHeader
              title="General Tasks"
              icon={<Check className="w-5 h-5" />}
              count={generalTasks.length}
              sectionKey="general"
              iconColor="text-slate-500"
              textColor="text-slate-600"
              showPlus={true}
            />

            {expandedSections.general && (
              <div className="px-[20px] pb-6">
                {generalTasks.map((item, index) => {
                  
                  const isChecked = checkedTasks.includes(item.id);

                  return (
                    <div
                      key={`general-${index}`}
                      className={`
                        bg-white rounded-xl w-full h-[50px] my-2 flex items-center px-4 relative transition-all duration-300
                        ${isChecked ? "bg-green-500 sparkle" : ""}
                        border-l-4 border-emerald-400 bg-emerald-50
                      `}
                    >
                      <button
                        onClick={() => toggleCheck(item.id)}
                        className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-colors duration-200
                          ${isChecked ? 'bg-green-500 border-green-500' : 'border-emerald-400'}
                        `}
                      >
                        {isChecked && <Check size={14} color="white" strokeWidth={3} />}
                      </button>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-base flex items-center gap-2 ${
                              isChecked ? 'line-through ' : 'text-slate-700'
                            }`}
                          >
                            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                            {item.content}
                          </span>
                          
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-emerald-200 text-emerald-700">
                            Anytime
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )
            }
          </>
        {/* Current Session Tasks */}
        {currentSessionTasks.length > 0 && (
          <>
            <SectionHeader
              title={`Current Session ${currentSession}`}
              icon={<Target className="w-5 h-5 animate-pulse" />}
              count={currentSessionTasks.length}
              sectionKey="current"
              iconColor="text-blue-600"
              textColor="text-slate-700"
              showPlus={false}
            />

            {expandedSections.current && (
              <div className="px-[20px] pb-6">
                {currentSessionTasks.map((item, index) => {
                  
                  const isChecked = checkedTasks.includes(item.id);

                  return (
                    <div
                      key={`current-${index}`}
                      className={`
                        bg-white rounded-xl w-full h-[60px] my-2 flex items-center px-4 relative transition-all duration-300
                        ${isChecked ? "bg-green-500 sparkle" : ""}
                        border-l-4 border-blue-500 bg-blue-50 ring-2 ring-blue-200
                      `}
                    >
                      <button
                        onClick={() => toggleCheck(item.id)}
                        className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-colors duration-200
                          ${isChecked ? 'bg-green-500 border-green-500' : 'border-blue-400'}
                        `}
                      >
                        {isChecked && <Check size={14} color="white" strokeWidth={3} />}
                      </button>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-base ${
                              isChecked ? 'line-through ' : 'text-slate-700'
                            }`}
                          >
                            {item.content}
                          </span>
                          
                          <div className="px-3 py-1 rounded-full text-xs font-medium bg-blue-600 text-white flex items-center gap-1">
                            <Target className="w-3 h-3" />
                            Focus Now
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* Upcoming Tasks */}
        
          <>
            <SectionHeader
              title="Upcoming Sessions"
              icon={<Clock className="w-5 h-5" />}
              count={upcomingTasks.length}
              sectionKey="upcoming"
               iconColor="text-slate-500"
              textColor="text-slate-600"
              showPlus={false}
            />

            {expandedSections.upcoming && (
              <div className="px-[20px] pb-6">
                {upcomingTasks.map((item, index) => {
                  
                  const isChecked = checkedTasks.includes(item.id);

                  return (
                    <div
                      key={`upcoming-${index}`}
                      className={`
                        bg-white rounded-xl w-full h-[50px] my-2 flex items-center px-4 relative transition-all duration-300
                        ${isChecked ? "bg-green-500 sparkle" : ""}
                        border-l-4 border-slate-300 bg-slate-50 opacity-75
                      `}
                    >
                      <button
                        onClick={() => toggleCheck(item.id)}
                        className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-colors duration-200
                          ${isChecked ? 'bg-green-500 border-green-500' : 'border-slate-300'}
                        `}
                      >
                        {isChecked && <Check size={14} color="white" strokeWidth={3} />}
                      </button>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-base ${
                              isChecked ? 'line-through ' : 'text-slate-500'
                            }`}
                          >
                            {item.content}
                          </span>
                          
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-slate-200 text-slate-600">
                            Session {item.sessionId}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        

        
        
      </div>         
    )
    
   
}
export default TasksSection