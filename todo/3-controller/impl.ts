import { CreateTodoInteractorOutput, ListTodoInteractorOutput, TodoInteractorFactory } from "./deps";
import { CreateTodoControllerInput, CreateTodoRequest, ListTodoControllerInput, TodoControllerFactory } from "./ports";

export class TodoController<Todo, TodoRef> implements TodoControllerFactory<Todo, TodoRef> {
  constructor(
    private readonly interactorFactory: TodoInteractorFactory<Todo, TodoRef>,
  ) { }

  createTodo(presenter: CreateTodoInteractorOutput<Todo, TodoRef>): CreateTodoControllerInput {
    const createTodo = this.interactorFactory.createTodo({ presenter })
    return {
      run: (input: CreateTodoRequest) => createTodo.execute({ label: input.label, })
    }
  }
  listTodo(presenter: ListTodoInteractorOutput<Todo, TodoRef>): ListTodoControllerInput {
    const listTodo = this.interactorFactory.listTodo({ presenter })
    return {
      run: (input) => listTodo.execute(input)
    }
  }
}
