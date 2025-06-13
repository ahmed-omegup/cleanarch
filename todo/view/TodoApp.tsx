import { useState } from "react";
import { AddTodoDI, AddTodo as AddTodoHoc } from "./AddTodo";

export const TodoApp = (di: AddTodoDI) => {
  const AddTodo = AddTodoHoc(di);
  return function TodoApp() {
    const [open, setOpen] = useState(false);
    return open ? (
      <AddTodo close={() => setOpen(false)} />
    ) : (
      <button onClick={() => setOpen(true)}>Add </button>
    );
  };
};
