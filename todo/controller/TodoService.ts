import { CreateTodoPresenter, TodoInteractorFactory } from "../interactor";
import { CreateTodoController, CreateTodoRequest } from "./ports/TodoController";
import { TodoControllerFactory } from "./ports/TodoControllerFactory";

export class TodoService<TodoRef> implements TodoControllerFactory<TodoRef> {
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
