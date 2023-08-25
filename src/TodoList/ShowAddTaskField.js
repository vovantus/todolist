import { useState } from "react";

export default function ShowAddTaskField({ addTask }) {
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