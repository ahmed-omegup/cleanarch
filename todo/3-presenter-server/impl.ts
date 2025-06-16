import { TodoOps } from "../1-entities";
import { CreateTodoInteractorOutput, ListTodoInteractorOutput } from "./deps";
import { Encoder, ListTodoPresenterOutput, CreateTodoPresenterOutput, ServerTodoPresenterFactory } from "./ports";

export class ServerTodoPresenter<Todo, TodoRef> implements ServerTodoPresenterFactory<Todo, TodoRef> {
  constructor(
    private readonly refEncoder: Encoder<TodoRef>,
    private readonly ops: TodoOps<Todo>,
  ) { }

  createTodo(view: CreateTodoPresenterOutput): CreateTodoInteractorOutput<Todo, TodoRef> {
    const errors = {
      EmptyLabel: 'EmptyLabel',
      StoringError: 'UnknownError',
      UnknownError: 'UnknownError'
    } as const
    return {
      render: (response) => view.render(response.success ?
        { success: true, ref: this.refEncoder.encode(response.ref) } : { success: false, error: errors[response.error] }),
    }
  }
  listTodo(view: ListTodoPresenterOutput): ListTodoInteractorOutput<Todo, TodoRef> {
    return {
      render: (response) => view.render(
        {
          success: true, list: response.list.map(({ todo, ref }) => ({
            id: this.refEncoder.encode(ref),
            label: this.ops.getTitle(todo),
            completed: this.ops.isCompleted(todo),
          }))
        }),
    }
  }

}
