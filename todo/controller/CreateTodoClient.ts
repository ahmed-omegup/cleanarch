import { client } from "../network/client/remote";
import { TodoController } from "./TodoController";

export const createTodoClient: TodoController = {
  createTodo: (input) =>
    client.createTodo.mutate(input).catch((error) => {
      console.error("Error creating todo:", error);
      return { success: false, error: "UnknownError" };
    }),
};
