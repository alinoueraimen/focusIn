import { useState,useRef, useEffect } from "react"

export type TasksType = {
    id : number,
    content : string,
    isSelected : boolean,
    sessionId? : number
    isDone : boolean
}

function useTaskManagement(){
    const [tasks,setTasks] = useState<TasksType[]>([])
    const [isModalDisplayed,setIsModaldisplayed] = useState<boolean>(false)
    const [taskInputValue,setTaskInputValue] = useState<string>('');
    const [taskSessionIdValue,setTaskSessionIdValue]= useState <number | undefined>()
    const [isSectionDisplayed,setIsSectionDisplayed] = useState<boolean>(false)
    const [isEditMode,setIsEditMode] = useState<boolean>(false);
    const indexId = useRef(0);

    const hideSection = () =>{
        setIsSectionDisplayed(false);
    }

    const showSection = () =>{
        setIsSectionDisplayed(true);
    }
    const editTask=(id : number)=>{
      setIsEditMode(true)
      const selectedTask = tasks.filter((item)=>(item.id === id))
      if(selectedTask){
        setTaskInputValue(selectedTask[0].content);
      }else{
        alert('error on editTask function')
      }
    }
   
    const addTask =(e : React.FormEvent<HTMLFormElement>)=>{
      if(!taskInputValue.trim()){
        return       
       }
        e.preventDefault();
        console.log('add tasks function');
        indexId.current += 1
        const newTasks : TasksType = {
            id : indexId.current,
            content : taskInputValue,
            isSelected : false,
            sessionId : taskSessionIdValue,
            isDone : false,
        }
        setTasks(prev=>[...prev,newTasks])
        closeModal();
        setTaskInputValue('')
       }

     const handleModalInputChange=(e : React.ChangeEvent<HTMLInputElement>)=>{
      setTaskInputValue(e.target.value);
    }

    const submitModal= ()=>{
      null
    }

    const openModal=()=>{
      console.log("open modal")
      setIsModaldisplayed(true);
    }

    const closeModal=()=>{
      console.log("close modal")
      setIsModaldisplayed(false);
      setIsEditMode(false);
    }

    const selectTask = (index: number) => {
        setTasks(prev =>
          prev.map((task, i) =>
            i === index ? { ...task, isSelected: !task.isSelected } : task
          )
        );
      };

      const deleteTask = (id : number) => {
        const selectedTasks = tasks.filter((item) => (item.id !== id));
        if (selectedTasks.length > 0) {
          // alert(selectedTasks)        
          setTasks(selectedTasks);
        } else {
          alert("No tasks selected to delete.");
        }
      };

      const updateTask = (id: number, updates: Partial<TasksType>) => {
  setTasks(prev =>
    prev.map(task =>
      task.id === id ? { ...task, ...updates } : task
    )
  );
};

      // Alternative function specifically for toggling isDone
      const toggleTaskDone = (id: number) => {
        console.log('Toggling isDone for task:', id);
        setTasks((prev) =>
          prev.map((task) =>
            task.id === id ? { ...task, isDone: !task.isDone } : task
          )
        );
      };

        // Fungsi baru untuk load tasks dari localStorage
  const loadTasksFromStorage = (storedTasks: TasksType[]) => {
    if (storedTasks.length === 0) return;

    // Update indexId.current ke nilai terbesar dari storedTasks.id supaya tidak bentrok saat tambah task baru
    const maxId = Math.max(...storedTasks.map(task => task.id));
    indexId.current = maxId;

    // Update state tasks dengan data dari localStorage
    setTasks(storedTasks);
  };

    useEffect(()=>{
        console.log("tasks list :",tasks)
    },[tasks])

    useEffect(()=>{
      console.log('input value :',taskInputValue);
    },[taskInputValue])

    return {
        tasks,
        isModalDisplayed,
        isSectionDisplayed,
        loadTasksFromStorage,
        setTasks,
        addTask,
        selectTask,
        deleteTask,
        editTask,
        updateTask,        // Add this new function
        toggleTaskDone,    // Add this alternative function
        submitModal,
        openModal,
        closeModal,
        handleModalInputChange,
        setTaskSessionIdValue,
        hideSection,
        showSection,
        isEditMode,
        taskInputValue   
    }
    
}

export default useTaskManagement