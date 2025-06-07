import React,{useRef} from 'react';
import { useTaskManagementContext } from '../../../hooks/taskManagement/taskManagementContext';

function AddTasksModal() {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFocus= ()=>{
    setTimeout(() => {
    inputRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }, 300);
  }
  const {
    isModalDisplayed,
    handleModalInputChange,
    addTask,
    closeModal, 
    taskInputValue,
    isEditMode
    
  } = useTaskManagementContext();

  if (!isModalDisplayed) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // hanya tutup jika kliknya tepat di overlay, bukan elemen anak
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  
  return (
    <div
       className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto"
      onClick={handleOverlayClick}
    >
      <div className="bg-background rounded-lg p-6 shadow-lg w-[90%] max-w-md transform transition-transform duration-300 scale-100">
        <h1 className="font-medium text-lg text-text mb-3">{isEditMode ?  'Edit Task':'Add Task'}</h1>
        <form onSubmit={addTask}>
          <input
            value ={taskInputValue}
            ref = {inputRef}
            onFocus={handleFocus}
            placeholder="task name .."
            className="w-full border-2 border-text rounded-md p-2 resize-none overflow-hidden min-h-[38px] mb-3"
            onInput={(e) => {
              e.currentTarget.style.height = 'auto';
              e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
            }}
            onChange={handleModalInputChange}
          />
          <button
            className="w-full bg-primary text-white p-3 rounded-md font-semibold capitalize"
            title="add"
            type="submit"
          >
            <p className="text-white">add task</p>
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTasksModal;
