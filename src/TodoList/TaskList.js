import { useState } from "react";

export function TaskList({
    tasks,
    toggleTask,
    deleteTask,
    swapTasks,
    updateTask,
    loading,
    init
  }) {
    // DONE todo сделать через useState
    const [draggedTaskId, setDraggedTaskId] = useState(null);

    // if (loading) {
    //   return <Loading/>
    // };
  
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

    if (init) {
      return <div className="init">Инициализация</div>;
    }
  
    if (tasks.length === 0) {
      return <div>Список задач пуст!</div>;
    }
  
    const tasksList = tasks.map((el, id) => {
      return (
        <li
          key={el.id}
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
              {el.text}{!el.open && '✔'}
            </div>
            <div className="taskButtons">
              <button onClick={() => showEditPrompt(id, el.text)}>Изменть</button>
              <button onClick={() => showDelPrompt(id)}>Удалить</button>
            </div>
          </div>
        </li>
      );
    });
    return <ul className={ loading ? 'inactive' : '' }>{tasksList}</ul>;
  }