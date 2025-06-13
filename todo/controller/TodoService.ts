import { TodoInteractorFactory } from "../interactor";
import { TodoController, CreateTodoRequest, CreateTodoResponse } from "./TodoController";

export type Encoder<T> = {
  encode: (x: T)=> string
  decode: (x: string)=> T
}
export class TodoService<TodoRef> implements TodoController {
  constructor(
    private readonly interactorFactory: TodoInteractorFactory<TodoRef>,
    private readonly refEncoder: Encoder<TodoRef>
  ) { }

  createTodo(input: CreateTodoRequest) {
    return new Promise<CreateTodoResponse>((resolve) => {
      const createTodo = this.interactorFactory.createTodo.make({
        presenter: {
          render: (output) => {
            if (output.success) {
              resolve({ success: true, ref: this.refEncoder.encode(output.ref) });
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
