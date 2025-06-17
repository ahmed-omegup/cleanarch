import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { TodoDTO, ToggleTodoPresenterOutput, ToggleTodoRequest } from "./deps";


export type ToggleTodoDI = {
  toggleTodo: (presenter: ToggleTodoPresenterOutput) => {
    run: (todo: ToggleTodoRequest) => void;
  };
};

export const TodoItem = (di: ToggleTodoDI) => {
  return function TodoItem({ todo }: { todo: TodoDTO }) {
    const [patch, setPatch] = useState<Partial<TodoDTO>>();
    const [status, setStatus] = useState<{ status: 'error', error: string } | { status: 'pending' } | null>(null);
    const toggle = useCallback(() => {
      setStatus({ status: 'pending' });
      di.toggleTodo({
        render(response) {
          if (response.success) {
            setPatch({ completed: response.completed });
            setStatus(null);
          } else {
            setStatus({ error: response.error, status: 'error' });
          }
        }
      }).run({ ref: todo.key });
    }, []);
    const patched = { ...todo, ...patch };
    return (
      <label>
        <input type='checkbox' checked={patched.completed} disabled={status?.status === 'pending'} onClick={toggle} />
        <span>{patched.label}</span>
        {status?.status === 'error' ? <span style={{ color: "red" }}>{status.error}</span> : null}
      </label>
    );
  };
};
