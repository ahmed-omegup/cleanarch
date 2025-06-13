import { TodoInteractorFactory } from "../interactor";
import { TodoController, CreateTodoRequest, CreateTodoResponse } from "./TodoController";

export class TodoService<TodoRef> implements TodoController<TodoRef> {
   constructor(
      private readonly interactorFactory: TodoInteractorFactory<TodoRef>,
   ) { }

   createTodo(input: CreateTodoRequest) {
      return new Promise<CreateTodoResponse<TodoRef>>((resolve) => {
         const createTodo = this.interactorFactory.createTodo.make({
            presenter: {
               render: (output) => {
                  if (output.success) {
                     resolve({ success: true, ref: output.ref });
                  } else {
                     resolve({ success: false, error: output.error });
                  }
               }
            }
         });
         createTodo.execute({
            label: input.label,
         });
      })
   }
}
