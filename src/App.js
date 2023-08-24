import { useState, useEffect } from "react";
//import { db, fireApp, auth } from './firebase.js';
//import { collection, addDoc, query, getDocs } from 'firebase/firestore';

function ShowAddTaskField({ addTask }) {
  const [value, setValue] = useState("");

  function getGetEnterPressed(e) {
    if (e.keyCode === 13) {
      addTask(value);
      setValue("");
    }   
  }

  return (
    <>
      <div>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          placeholder="Введите текст задачи"
          id="taskInput"
          onKeyDown={getGetEnterPressed}
        />
        <button
          onClick={() => {
            addTask(value);
            setValue("");
          }}
        >
          Добавить
        </button>
      </div>
    </>
  );
}

function ShowTaskList({
  tasks,
  toggleTask,
  deleteTask,
  swapTasks,
  updateTask
}) {
  // DONE todo сделать через useState
  const [draggedTaskId, setDraggedTaskId] = useState(null);

  function showDelPrompt(id) {
    const userDecision = window.confirm("Удалить задачу?");
    if (userDecision) {
      deleteTask(id);
    }
  }

  function showEditPrompt(id, text) {
    const userDecision = prompt("Измените текст задания:", text);
    if (userDecision) {
      updateTask(id, userDecision);
    }
  }

  function onDragOver(e) {
    e.preventDefault();
  }

  if (tasks.length === 0) {
    return <div>Список задач пуст!</div>;
  }

  const tasksList = tasks.map((el, id) => {
    return (
      <li
        key={"task" + id}
        className={el.open ? "open" : "closed"}
        onDragStart={() => setDraggedTaskId(id)}
        onDragOver={onDragOver}
        onDrop={() => swapTasks(id, draggedTaskId)}
        draggable
      >
        <div className="task">
          <div>
            <input
              type="checkbox"
              checked={!el.open}
              onChange={() => toggleTask(id)}
            ></input>
            {el.text}
          </div>
          <div className="taskButtons">
            <button onClick={() => showEditPrompt(id, el.text)}>Изменть</button>
            <button onClick={() => showDelPrompt(id)}>Удалить</button>
          </div>
        </div>
      </li>
    );
  });
  return <ul>{tasksList}</ul>;
}

export default function ToDoList() {
  const [tasks, setTasks] = useState(getTasks());

  function toggleTaskState(id) {
    const updatedTasks = tasks.slice();
    updatedTasks[id].open = !updatedTasks[id].open;
    setTasks(updatedTasks);
  }

  function addTask(text) {
    if (text.trim() === "") {
      return;
    }
    const newTask = new SingleTask(text, true);
    setTasks([newTask,...tasks]);
  }

  function delTask(id) {
     // DONE tood реализовать удаление через filter()
    const updatedTasks = tasks.filter((el,index) => (index!==id));
    setTasks(updatedTasks);
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

    // const updatedTasks = [];
    // const moveUp = id > position;
    // const swaptask = tasks[id];
    // for (let i = 0; i < tasks.length; i++) {
    //   if (i === id) {
    //     continue;
    //   }
    //   if (moveUp && i === position) {
    //     updatedTasks.push(swaptask);
    //   }
    //   updatedTasks.push(tasks[i]);
    //   if (!moveUp && i === position) {
    //     updatedTasks.push(swaptask);
    //   }
    // }

    setTasks(updatedTasks);
  }

  function updateTask(id, text) {
    const updatedTasks = tasks.slice();
    updatedTasks[id].text = text;
    setTasks(updatedTasks);
  }

  // prettier
  return (
    <>
      <h1>TODO List</h1>
      <ShowAddTaskField addTask={addTask} />
      <ShowTaskList
        tasks={tasks}
        toggleTask={toggleTaskState}
        deleteTask={delTask}
        swapTasks={changeTaskPosition}
        updateTask={updateTask}
      />
    </>
  );
}

class SingleTask {
  constructor(text, open) {
    this.text = text;
    this.open = open;
  }
}

function getTasks() {
  const mockTasks = [
    "!Mockup task 1: create todo",
    "!Mockup task 2: call accountant",
    "!Mockup task 3: connect backend"
  ];

  // DONE todo через map
  return mockTasks.map(el => new SingleTask(el, true));
}
