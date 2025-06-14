import { useMemo, useState } from "react";
import {
  CreateTodoRequest,
} from "../controller/ports";
import { CreateTodoResponse } from "../presenter/ports";

type View<T> = { render: (response: T) => void; }

export type AddTodoDI = {
  createTodo: (view: View<CreateTodoResponse>) => {
    run: (todo: CreateTodoRequest) => void;
  };
};
export const AddTodo = (di: AddTodoDI) => {
  return function AddTodo(props: { close: () => void }) {
    const [output, setOutput] = useState<{ message: string }>();
    const createTodo = useMemo(() => {
      const view: View<CreateTodoResponse> = {
        render: (res) => {
          if (res.success) props.close();
          setOutput(
            res.success
              ? undefined
              : { message: res.error === 'EmptyLabel' ? "Todo can't be empty" : "Unknown error occurred" }
          );
        }
      }
      return di.createTodo(view);
    }, [di.createTodo]);
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const title = new FormData(e.currentTarget).get("title") as string;
      createTodo.run({ label: title });
    };
    return (
      <form onSubmit={onSubmit}>
        <input name="title" />
        {output && <span>{output.message}</span>}
        <button>Add</button>
      </form>
    );
  };
};
