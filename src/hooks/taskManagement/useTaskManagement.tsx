import { useState,useRef, useEffect } from "react"

type TasksType = {
    id : number,
    content : string,
    isSelected : boolean,
}

function useTaskManagement(){
    const [tasks,setTasks] = useState<TasksType[]>([])
    const [isModalDisplayed,setIsModaldisplayed] = useState<boolean>(false)
    const [taskInputValue,setTaskInputValue] = useState<string>('');
    const indexId = useRef(0);
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
            isSelected : false
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
    }
    const selectTask = (index: number) => {
        setTasks(prev =>
          prev.map((task, i) =>
            i === index ? { ...task, isSelected: !task.isSelected } : task
          )
        );
      };
      const deleteTask = () => {
        const selectedTasks = tasks.filter((item) => item.isSelected);
        
        if (selectedTasks.length > 0) {
          setTasks((prev) => prev.filter((item) => !item.isSelected));
        } else {
          alert("No tasks selected to delete.");
        }
      };
      const editTask = (id: number) => {
        console.log(id);
        setTasks((prev) =>
          prev.map((task) =>
            task.id === id ? { ...task, content: 'hai' } : task
          )
        );
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
        addTask,
        selectTask,
        deleteTask,
        editTask,
        submitModal,
        openModal,
        closeModal,
        handleModalInputChange
    }
    
}
export default useTaskManagement