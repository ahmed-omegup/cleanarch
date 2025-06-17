import { CreateTodoInteractorOutput, ListTodoInteractorOutput, TodoDom, TodoInteractorFactory, ToggleTodoInteractorOutput } from "./deps";
import { CreateTodoControllerInput, CreateTodoRequest, ListTodoControllerInput, TodoControllerFactory, ToggleTodoControllerInput } from "./ports";

export class TodoController<TodoEntity extends TodoDom['Entity'], TodoRef extends TodoDom['Ref'], Error> implements TodoControllerFactory<TodoEntity, Error> {
  constructor(
    private readonly interactorFactory: TodoInteractorFactory<TodoEntity, TodoRef, Error>,
    private readonly decode: (x: string) => TodoRef,
  ) { }

  createTodo(presenter: CreateTodoInteractorOutput<TodoEntity, Error>): CreateTodoControllerInput {
    const createTodo = this.interactorFactory.createTodo({ presenter })
    return {
      run: (input: CreateTodoRequest) => createTodo.execute({ label: input.label, })
    }
  }
  listTodo(presenter: ListTodoInteractorOutput<TodoEntity, Error>): ListTodoControllerInput {
    const listTodo = this.interactorFactory.listTodo({ presenter })
    return {
      run: (input) => listTodo.execute(input)
    }
  }
  toggleTodo(presenter: ToggleTodoInteractorOutput<Error>): ToggleTodoControllerInput {
    const toggleTodo = this.interactorFactory.toggleTodo({ presenter })
    return {
      run: (input) => toggleTodo.execute({ ref: this.decode(input.ref) })
    }
  }
}
