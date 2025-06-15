import { useMemo, useState } from "react";
import {
  CreateTodoRequest,
} from "./controller";
import { CreateTodoPresenterOutput, CreateTodoResponse } from "./presenter";


export type AddTodoDI = {
  createTodo: (presenter: CreateTodoPresenterOutput) => {
    run: (todo: CreateTodoRequest) => void;
  };
};

export const AddTodo = (di: AddTodoDI) => {
  return function AddTodo(props: { close: () => void }) {
    const [output, setOutput] = useState<{ message: string }>();
    const createTodo = useMemo(() => {
      return di.createTodo({
        render: (response) => {
          if(response.success) {
            setOutput(undefined)
            props.close();
          } else {
            setOutput({ message: response.output });            
          }            
        }
      });
    }, []);
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
