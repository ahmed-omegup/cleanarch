import { CreateTodoInteractorOutput, ListTodoInteractorOutput, TodoInteractorFactory } from "./interactor";
import { CreateTodoControllerInput, CreateTodoRequest, ListTodoControllerInput, TodoControllerFactory } from "./ports";

export class TodoController<TodoRef> implements TodoControllerFactory<TodoRef> {
  constructor(
    private readonly interactorFactory: TodoInteractorFactory<TodoRef>,
  ) { }

  createTodo(presenter: CreateTodoInteractorOutput<TodoRef>): CreateTodoControllerInput {
    const createTodo = this.interactorFactory.createTodo({ presenter })
    return {
      run: (input: CreateTodoRequest) => createTodo.execute({ label: input.label, })
    }
  }
  listTodo(presenter: ListTodoInteractorOutput<TodoRef>): ListTodoControllerInput {
    const listTodo = this.interactorFactory.listTodo({ presenter })
    return {
      run: (input) => listTodo.execute(input)
    }
  }
}
