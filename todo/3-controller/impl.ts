import { CreateTodoInteractorOutput, ListTodoInteractorOutput, TodoDom, TodoInteractorFactory } from "./deps";
import { CreateTodoControllerInput, CreateTodoRequest, ListTodoControllerInput, TodoControllerFactory } from "./ports";

export class TodoController<TodoEntity extends TodoDom['Entity']> implements TodoControllerFactory<TodoEntity> {
  constructor(
    private readonly interactorFactory: TodoInteractorFactory<TodoEntity>,
  ) { }

  createTodo(presenter: CreateTodoInteractorOutput<TodoEntity>): CreateTodoControllerInput {
    const createTodo = this.interactorFactory.createTodo({ presenter })
    return {
      run: (input: CreateTodoRequest) => createTodo.execute({ label: input.label, })
    }
  }
  listTodo(presenter: ListTodoInteractorOutput<TodoEntity>): ListTodoControllerInput {
    const listTodo = this.interactorFactory.listTodo({ presenter })
    return {
      run: (input) => listTodo.execute(input)
    }
  }
}
