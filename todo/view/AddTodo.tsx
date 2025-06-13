import { useController, View } from "../../utils/view";
import {
  CreateTodoRequest,
  CreateTodoResponse,
} from "../controller/TodoController";
type State = { message: string };
export type AddTodoDI = {
  createTodo: (view: View<State, CreateTodoResponse>) => {
    run: (todo: CreateTodoRequest) => void;
  };
};
export const AddTodo = (di: AddTodoDI) => {
  return function AddTodo(props: { close: () => void }) {
    const [output, createTodo] = useController(di.createTodo, (res) => {
      if (res.success) props.close();
    });
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
