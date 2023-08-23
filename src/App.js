import { useState, useEffect } from "react";
//import { db, fireApp, auth } from './firebase.js';
//import { collection, addDoc, query, getDocs } from 'firebase/firestore';


function ShowAddTaskField({addTask}){

  function getTaskText () {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value;
    taskInput.value = "";
    return text;
  }

  function getGetEnterPressed (e) {
    if (e.keyCode === 13) {
      const text = e.target.value;
      e.target.value = "";
      return(text);
    }
    return '';
  }

  return (
            <div>
              <input type="text" placeholder="Введите текст задачи" id="taskInput" onKeyDown={(e) => addTask(getGetEnterPressed(e))}></input>
              <button onClick={() => addTask(getTaskText())}>Добавить</button>
            </div>
          )

}

function ShowTaskList({tasks, toggleTask, deleteTask, swapTasks, updateTask}) {

  let draggedTaskId;
  
  function showDelPrompt(id) {
    const userDecision = window.confirm('Удалить задачу?');
    if (userDecision) {
      deleteTask(id);
    }
    return;
  }

  function showEditPrompt(id, text) {
    const userDecision = prompt('Измените текст задания:',text);
    if (userDecision) {
      updateTask(id, userDecision);
    }
    return;
  }

  function onDragOver(e) {
    e.preventDefault();
  }

  function replaceTaskOnDrop(e,targetTaskId) {
    e.preventDefault();
    swapTasks(targetTaskId,draggedTaskId);
  }

  function getGragedTask(id) {
    draggedTaskId = id;
  }

  if (tasks.length===0) {
    return (<>
            <div>
              Список задач пуст!
              </div>
      </>)
  }


  const tasksList = tasks.map((el,id) => {
    return (
      <li key={'task' + id} className={ el.open ? 'open' : 'closed' } onDragStart={() => getGragedTask(id)} onDragOver = {onDragOver} onDrop={(e)=>replaceTaskOnDrop(e,id)} draggable>
        <div className="task">
          <div>
            <input type="checkbox" checked={!el.open} onChange={()=> toggleTask(id)}></input>
            {el.text}
          </div>
          <div  className="taskButtons">
            <button onClick={()=> showEditPrompt(id,el.text)}>Изменть</button>
            <button onClick={()=> showDelPrompt(id)}>Удалить</button>
          </div>
        </div>
      </li>
    )
  }
  );
  return (
            <ul>
              {tasksList}
              </ul>          
          );
};



export default function ToDoList() {

  const [tasks, setTasks] = useState(getTasks());

  function toggleTaskState(id) {
    const updatedTasks = tasks.slice();
    updatedTasks[id].open = !updatedTasks[id].open;
    setTasks(updatedTasks);
  }

  function addTask(text) {
    if (text === '') {
      return;
    };
    const newTask = new SingleTask(text, true);
    const updatedTasks = tasks.slice();
    updatedTasks.unshift(newTask);
    setTasks(updatedTasks);
  }

  function delTask(id) {
    const updatedTasks = tasks.slice();
    updatedTasks.splice(id,1);
    setTasks(updatedTasks);
  }

  function changeTaskPosition(position, id) {
    const moveUp = id > position;    
    const swaptask = tasks[id];
    const updatedTasks = [];
    for (let i=0; i<tasks.length; i++) {
      if (i===id) {
        continue;
      }
      if (moveUp && i === position) {
        updatedTasks.push(swaptask);
      }
      updatedTasks.push(tasks[i]);
      if (!moveUp && i === position){
        updatedTasks.push(swaptask);
      }
    }
    setTasks(updatedTasks);
  }

  function updateTask(id, text) {
    const updatedTasks = tasks.slice();
    updatedTasks[id].text = text;
    setTasks(updatedTasks);
  }


  return (<>
            <h1>TODO List</h1>
            <ShowAddTaskField addTask={addTask}/>
            <ShowTaskList tasks={tasks} toggleTask={toggleTaskState} deleteTask={delTask} swapTasks={changeTaskPosition} updateTask={updateTask}/>
         </>)

}

class SingleTask {
  constructor (text, open) {
    return {
      'text' : text,
      'open' : open,
    }    
  }
}

class Tasks {
  constructor (tasks) {
    return tasks.map((el)=>{
      return new SingleTask(el, true)
    })
  }
}

function getTasks () {
  const mockTasks = ['!Mockup task 1: create todo','!Mockup task 2: call accountant','!Mockup task 3: connect backend'];
  return new Tasks(mockTasks)
}


