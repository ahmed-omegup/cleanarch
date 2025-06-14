import { CreateTodoController, CreateTodoRequest, TodoControllerFactory } from "../controller";
import { CreateTodoPresenter } from "../interactor";

export class ClientTodoController<TodoRef> implements TodoControllerFactory<TodoRef> {
  constructor(
  ) { }

  createTodo(presenter: CreateTodoPresenter<TodoRef>): CreateTodoController {
    return {
      run: (input: CreateTodoRequest) => {
        // TODO
      }
    }
  }
}
