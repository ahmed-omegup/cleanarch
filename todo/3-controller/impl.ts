import { CreateTodoInteractorOutput, ListTodoInteractorOutput, TodoDom, TodoInteractorFactory } from "./deps";
import { CreateTodoControllerInput, CreateTodoRequest, ListTodoControllerInput, TodoControllerFactory } from "./ports";

export class TodoController<TodoEntity extends TodoDom['Entity'], Error> implements TodoControllerFactory<TodoEntity, Error> {
  constructor(
    private readonly interactorFactory: TodoInteractorFactory<TodoEntity, Error>,
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
}
