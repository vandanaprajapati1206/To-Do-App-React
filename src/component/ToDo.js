import React, { useReducer, useRef, useState } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "add-todo":
      return {
        todos: [...state.todos, { task: action.task, completed: false }],
        todoCount: state.todoCount + 1,
      };
    case "toggle-todo":
      return {
        todos: state.todos.map((a, index) =>
          index === action.index ? { ...a, completed: !a.completed } : a
        ),
        todoCount: state.todoCount,
      };
    default:
      return state;
  }
}

export default function ToDo() {
  //   const [task, setTask] = useState("");
  const [list, setList] = useState("");
  const [mes, setMes] = useState({ show: false, msg: "", type: "" });

  const inputTask = useRef();

  const [{ todos, todoCount }, dispatch] = useReducer(reducer, {
    todos: [],
    todoCount: 0,
  });
  const [task, setTask] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    console.log("to do added", task);
    console.log("useRef",inputTask.current);
    inputTask.current.style.width ="400px"

    if (!task) {
      setMes({ show: true, mes: "Enter task", type: "danger" });
    } else {
      setMes({ show: true, mes: "task Added", type: "sucess" });
      dispatch({ type: "add-todo", task });
      setTask("");
    }
  }

  return (
    <section>
{console.warn(mes)}
      <form onSubmit={handleSubmit}>
        <h2>To - Do Projects</h2>
        <input
        ref={inputTask}
          type="text"
          id="task"
          name="task"
          placeholder="Enter Task"
          value={task || ''} 
          onChange={(e) => setTask(e.target.value)}
          style={{width: "100px"}}
        />
        <button type="submit"> Add </button>
      </form>
      {/* <pre>{JSON.stringify(todos, null, 2)}</pre> */}
      <div>
        <h2>Total To-Do : {todoCount}</h2>
      </div>
      {todos.map((a, index) => (
        <div
          key={a.task}
          onClick={() => dispatch({ type: "toggle-todo", index })}
          style={{
            textDecoration: a.completed ? "line-through" : "",
          }}
        >
          {a.task}
        </div>
      ))}
    </section>
  );
}
