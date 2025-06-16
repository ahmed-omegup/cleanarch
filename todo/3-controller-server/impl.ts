import { CreateTodoInteractorOutput, ListTodoInteractorOutput, TodoDom, TodoInteractorFactory } from "./deps";
import { CreateTodoServerController, CreateTodoRequest, TodoServerControllerFactory, ListTodoServerController } from "./ports";

export class ServerTodoController<TodoEntity extends TodoDom['Entity']> implements TodoServerControllerFactory<TodoEntity> {
  constructor(
    private readonly interactorFactory: TodoInteractorFactory<TodoEntity>,
  ) { }

  createTodo(presenter: CreateTodoInteractorOutput<TodoEntity>): CreateTodoServerController {
    const createTodo = this.interactorFactory.createTodo({ presenter })
    return {
      run: (input: CreateTodoRequest) => createTodo.execute({ label: input.label, })
    }
  }
  listTodo(presenter: ListTodoInteractorOutput<TodoEntity>): ListTodoServerController {
    const listTodo = this.interactorFactory.listTodo({ presenter })
    return {
      run: (input) => listTodo.execute(input)
    }
  }
}
