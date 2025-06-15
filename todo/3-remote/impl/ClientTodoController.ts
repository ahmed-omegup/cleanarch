import { CreateTodoControllerInput, CreateTodoRequest, TodoControllerFactory } from "../controller";
import { CreateTodoInteractorOutput } from "../interactor";

export class ClientTodoController<TodoRef> implements TodoControllerFactory<TodoRef> {
  constructor(
  ) { }

  createTodo(presenter: CreateTodoInteractorOutput<TodoRef>): CreateTodoControllerInput {
    return {
      run: (input: CreateTodoRequest) => {
        // TODO
      }
    }
  }
}
