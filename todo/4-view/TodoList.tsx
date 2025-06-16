import { useEffect, useReducer, useState } from "react";
import { ListTodoRequest, ListTodoPresenterOutput, TodoDTO } from "./deps";


export type ListTodoDI = {
  listTodo: (presenter: ListTodoPresenterOutput) => {
    run: (todo: ListTodoRequest) => void;
  };
};

export const ListTodo = (di: ListTodoDI) => {
  return function ListTodo() {
    const [job, refresh] = useReducer(() => ({}), {})
    const [todos, setTodos] = useState<{ job: {}, list: TodoDTO[], error?: string }>();
    useEffect(() => {
      di.listTodo({
        render(response) {
          setTimeout(() => { // Just to simulate network delay
            setTodos(response.success ? { job, list: response.list } : { job, list: [], error: response.error });
          }, 100)
        }
      }).run({});
    }, [job]);
    return (
      <ul>
        {todos?.job !== job ? <li>Loading...</li> : todos.error ? <li style={{ color: "red" }}>{todos.error}</li> : todos.list.length === 0 ? <li>No todos found</li> : todos.list.map((todo) => (
          <li key={todo.key}>
            <label>
              <input type='checkbox' checked={todo.completed} readOnly />
              <span>{todo.label}</span>
            </label>
          </li>
        ))}
        <button onClick={refresh}>Refresh</button>
      </ul>
    );
  };
};
