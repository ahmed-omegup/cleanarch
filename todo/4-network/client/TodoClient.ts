import { client } from "./remote";
import { TodoControllerFactory } from "../controller";
import { Encoder } from "../presenter";
import { Todo } from "../../1-entities";

export const todoClient = <TodoRef>(encoder: Encoder<TodoRef>): TodoControllerFactory<TodoRef> => {
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
