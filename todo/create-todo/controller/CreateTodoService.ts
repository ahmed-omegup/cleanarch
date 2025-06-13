import { CreateTodoFactory, CreateTodoOutput } from "../interactor";
import { CreateTodoController, CreateTodoRequest, CreateTodoResponse } from "./CreateTodoController";

export class CreateTodoService<TodoRef> implements CreateTodoController<TodoRef> {
  constructor(
    private readonly createTodoFactory: CreateTodoFactory<TodoRef>,
  ) { }

  handle(input: CreateTodoRequest) {
    return new Promise<CreateTodoResponse<TodoRef>>((resolve) => {
      const createTodo = this.createTodoFactory.create({
        presenter: {
          render: (output: CreateTodoOutput<TodoRef>) => {
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
