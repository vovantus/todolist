import { useState, useEffect } from "react";
import ShowAddTaskField from "./TodoList/ShowAddTaskField";
import { TaskList } from "./TodoList/TaskList";
import { SingleTask } from "./TodoList/TaskStructure";
import { db, firestoreDocRef, delFireTask, updateFireTasks } from "./firebase";
import { onSnapshot } from 'firebase/firestore';



export default function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [init, setInit] = useState(true);

  

  useEffect (()=>{
    const unsubscribe = onSnapshot(firestoreDocRef, (doc) => {
      if (doc.data()) {
        setTasks(doc.data());
        setTimeout(()=> {
          setLoading(false);
          setInit(false)}
          ,500);
        } else {
          setTasks([]);
          setLoading(false);
          setInit(true)
        }

      },
    (error) => {
      console.log('no connection!');
      setInit(true);
      setLoading(true);
      setTasks([]);
    });
    return() => { 
      unsubscribe();
    };
  },[]);

  function toggleTaskState(id) {
    const updatedTasks = tasks.slice();
    updatedTasks[id].open = !updatedTasks[id].open;
    setLoading(true);
    updateFireTasks(updatedTasks);
  }

  function addTask(text) {
    if (text.trim() === "") {
      return;
    }
    const newTask = new SingleTask(text, true);
    const updatedTasks = [newTask,...tasks];
    setLoading(true);
    updateFireTasks(updatedTasks);

  }
  

  function delTask(id) {
     // DONE tood реализовать удаление через filter()
    setLoading(true);
    delFireTask(tasks[id]);
  }

  function changeTaskPosition(position, id) {
     // DONE todo драг-н-дроп на себя же
    if (position === id) {
      return;
    }
    

    // DONE todo переписать на слайсы
    const updatedTasks = id > position ?
      [...tasks.slice(0,position), tasks[id],...tasks.slice(position,id),...tasks.slice(id+1)]
      :
      [...tasks.slice(0,id),...tasks.slice(id+1,position+1), tasks[id],...tasks.slice(position+1)];
    setLoading(true);
    updateFireTasks(updatedTasks);
    
  }

  function updateTask(id, text) {
    const updatedTasks = tasks.slice();
    updatedTasks[id].text = text;
    setLoading(true);
    updateFireTasks(updatedTasks);
  }

  // prettier
  return (
    <>
      <h1>TODO List</h1>
      <ShowAddTaskField addTask={addTask} />
      <TaskList
        tasks={tasks}
        toggleTask={toggleTaskState}
        deleteTask={delTask}
        swapTasks={changeTaskPosition}
        updateTask={updateTask}
        loading={loading}
        init={init}
      />
    </>
  );
}



function getMockTasks(tasks) {
  const mockTasks = [
    "!Mockup task 1: create todo",
    "!Mockup task 2: call accountant",
    "!Mockup task 3: connect backend"
  ];

  // DONE todo через map
  return mockTasks.map(el => new SingleTask(el, true));
}



