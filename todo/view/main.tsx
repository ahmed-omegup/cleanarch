import { createRoot } from "react-dom/client";
import { TodoApp as TodoAppHoc } from "./TodoApp";
import { createTodoClient } from "../controller/CreateTodoClient";

const TodoApp = TodoAppHoc({
  createTodo: (view) => {
    return {
      run: async (input) => {
        const res = await createTodoClient.createTodo(input);
        view.onAction(res);
        const errors = { EmptyLabel: "Todo can't be empty", UnknownError: "Unknown error occurred" };
        view.render(res.success ? undefined : { message: errors[res.error] });
      },
    };
  },
});

createRoot(document.getElementById("app-root")!).render(<TodoApp />);
