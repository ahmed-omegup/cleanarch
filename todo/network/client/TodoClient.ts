import { client } from "./remote";
import { Todo } from "../../todo";
import { TodoControllerFactory } from "../../controller/ports/TodoControllerFactory";
import { Encoder } from "../../presenter/TodoPresenterImpl";

export const todoClient = <TodoRef>(encoder: Encoder<TodoRef>): TodoControllerFactory<TodoRef, "UnknownError"> => {
  return {
    createTodo: (presenter) => {
      return {
        run: (input) =>
          client.createTodo.mutate(input).then((result) => {
            if (result.success) {
              return presenter.render({ success: true, ref: encoder.decode(result.ref), todo: new Todo(input.label, false) });
            } else {
              return presenter.render({ success: false, error: result.error });
            }
          }, (error) => {
            console.error("Error creating todo:", error);
            return { success: false, error: "UnknownError" };
          }),

      }

    }
  }
};
