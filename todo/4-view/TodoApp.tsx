import { useState } from "react";
import { AddTodoDI, AddTodo as AddTodoHoc } from "./AddTodo";
import { ListTodoDI, ListTodo as ListTodoHoc } from "./TodoList";

export const TodoApp = (di: AddTodoDI & ListTodoDI) => {
  const AddTodo = AddTodoHoc(di);
  const ListTodo = ListTodoHoc(di);
  return function TodoApp() {
    const [open, setOpen] = useState(false);
    return open ? (
      <AddTodo close={() => setOpen(false)} />
    ) : (<>
      <ListTodo />
      <button onClick={() => setOpen(true)}>Add </button>
    </>
    );
  };
};
