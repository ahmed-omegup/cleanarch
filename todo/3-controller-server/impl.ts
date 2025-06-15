import { CreateTodoInteractorOutput, ListTodoInteractorOutput, TodoInteractorFactory } from "./deps";
import { CreateTodoServerController, CreateTodoRequest, TodoControllerFactory, ListTodoServerController } from "./ports";

export class ServerTodoController<TodoRef> implements TodoControllerFactory<TodoRef> {
  constructor(
    private readonly interactorFactory: TodoInteractorFactory<TodoRef>,
  ) { }

  createTodo(presenter: CreateTodoInteractorOutput<TodoRef>): CreateTodoServerController {
    const createTodo = this.interactorFactory.createTodo({ presenter })
    return {
      run: (input: CreateTodoRequest) => createTodo.execute({ label: input.label, })
    }
  }
  listTodo(presenter: ListTodoInteractorOutput<TodoRef>): ListTodoServerController {
    const listTodo = this.interactorFactory.listTodo({ presenter })
    return {
      run: (input) => listTodo.execute(input)
    }
  }
}
