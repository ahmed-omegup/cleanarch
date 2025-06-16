import { CreateTodoInteractorOutput, ListTodoInteractorOutput, TodoDom, TodoInteractorFactory } from "./deps";
import { CreateTodoServerController, CreateTodoRequest, TodoServerControllerFactory, ListTodoServerController } from "./ports";

export class ServerTodoController<TodoEntity extends TodoDom['Entity'], InnerError> implements TodoServerControllerFactory<TodoEntity, InnerError> {
  constructor(
    private readonly interactorFactory: TodoInteractorFactory<TodoEntity, InnerError>,
  ) { }

  createTodo(presenter: CreateTodoInteractorOutput<TodoEntity, InnerError>): CreateTodoServerController {
    const createTodo = this.interactorFactory.createTodo({ presenter })
    return {
      run: (input: CreateTodoRequest) => createTodo.execute({ label: input.label, })
    }
  }
  listTodo(presenter: ListTodoInteractorOutput<TodoEntity, InnerError>): ListTodoServerController {
    const listTodo = this.interactorFactory.listTodo({ presenter })
    return {
      run: (input) => listTodo.execute(input)
    }
  }
}
