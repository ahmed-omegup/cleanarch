import { CreateTodoInteractorOutput, ListTodoInteractorOutput, TodoDom, TodoInteractorFactory, ToggleTodoInteractorOutput } from "./deps";
import { CreateTodoServerController, CreateTodoRequest, TodoServerControllerFactory, ListTodoServerController, ToggleTodoServerController } from "./ports";

export class ServerTodoController<TodoEntity extends TodoDom['Entity'], TodoRef extends TodoDom['Ref'], InnerError> implements TodoServerControllerFactory<TodoEntity, InnerError> {
  constructor(
    private readonly interactorFactory: TodoInteractorFactory<TodoEntity, TodoRef, InnerError>,
    private readonly decode: (ref: string) => TodoRef,
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
  toggleTodo(presenter: ToggleTodoInteractorOutput<InnerError>): ToggleTodoServerController {
    const toggleTodo = this.interactorFactory.toggleTodo({ presenter })
    return {
      run: (input) => toggleTodo.execute({ ref: this.decode(input.ref) })
    }
  }
}
