import { CreateTodoInteractorOutput, ListTodoInteractorOutput, TodoInteractorFactory } from "./deps";
import { CreateTodoServerController, CreateTodoRequest, TodoServerControllerFactory, ListTodoServerController } from "./ports";

export class ServerTodoController<Todo, TodoRef> implements TodoServerControllerFactory<Todo, TodoRef> {
  constructor(
    private readonly interactorFactory: TodoInteractorFactory<Todo, TodoRef>,
  ) { }

  createTodo(presenter: CreateTodoInteractorOutput<Todo, TodoRef>): CreateTodoServerController {
    const createTodo = this.interactorFactory.createTodo({ presenter })
    return {
      run: (input: CreateTodoRequest) => createTodo.execute({ label: input.label, })
    }
  }
  listTodo(presenter: ListTodoInteractorOutput<Todo, TodoRef>): ListTodoServerController {
    const listTodo = this.interactorFactory.listTodo({ presenter })
    return {
      run: (input) => listTodo.execute(input)
    }
  }
}
