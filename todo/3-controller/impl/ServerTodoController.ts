import { CreateTodoPresenter, TodoInteractorFactory } from "../interactor";
import { CreateTodoController, CreateTodoRequest, TodoControllerFactory } from "../ports";

export class ServerTodoController<TodoRef> implements TodoControllerFactory<TodoRef> {
  constructor(
    private readonly interactorFactory: TodoInteractorFactory<TodoRef>,
  ) { }

  createTodo(presenter: CreateTodoPresenter<TodoRef>): CreateTodoController {
    const createTodo = this.interactorFactory.createTodo.make({ presenter })
    return {
      run: (input: CreateTodoRequest) => createTodo.execute({ label: input.label, })
    }
  }
}
