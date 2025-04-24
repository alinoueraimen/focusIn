import { useState,useRef, useEffect } from "react"

type TasksType = {
    id : number,
    content : string,
    isSelected : boolean,
}

function useTaskManagement(){
    const [tasks,setTasks] = useState<TasksType[]>([])
    const indexId = useRef(0);
    const addTasks =(text : string)=>{
        console.log('add tasks function');
        indexId.current += 1
        const newTasks : TasksType = {
            id : indexId.current,
            content : text,
            isSelected : false
        }
        setTasks(prev=>[...prev,newTasks])
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
    return {
        tasks,
        addTasks,
        selectTask,
        deleteTask,
        editTask
    }
    
}
export default useTaskManagement