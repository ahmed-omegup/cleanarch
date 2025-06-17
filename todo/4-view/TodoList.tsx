import { useEffect, useReducer, useState } from "react";
import { ListTodoRequest, ListTodoPresenterOutput, TodoDTO } from "./deps";
import { TodoItem as TodoItemHoc, ToggleTodoDI } from "./TodoItem";


export type ListTodoDI = {
  listTodo: (presenter: ListTodoPresenterOutput) => {
    run: (todo: ListTodoRequest) => void;
  };
} & ToggleTodoDI;

export const ListTodo = (di: ListTodoDI) => {
  const TodoItem = TodoItemHoc(di);
  return function ListTodo() {
    const [job, refresh] = useReducer(() => ({}), {})
    const [todos, setTodos] = useState<{ job: {}, list: TodoDTO[], error?: string }>();
    useEffect(() => {
      di.listTodo({
        render(response) {
          setTodos(response.success ? { job, list: response.list } : { job, list: [], error: response.error });
        }
      }).run({});
    }, [job]);
    return (
      <ul>
        {todos?.job !== job ? <li>Loading...</li> : todos.error ? <li style={{ color: "red" }}>{todos.error}</li> : todos.list.length === 0 ? <li>No todos found</li> : todos.list.map((todo) => (
          <li key={todo.key}>
            <TodoItem todo={todo} />
          </li>
        ))}
        <button onClick={refresh}>Refresh</button>
      </ul>
    );
  };
};
