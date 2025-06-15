import { CreateTodoInteractorOutput, ListTodoInteractorOutput } from "./interactor";
import { Encoder, ListTodoPresenterOutput } from "./ports";
import { CreateTodoPresenterOutput, ServerTodoPresenterFactory } from "./ports";

export class ServerTodoPresenter<TodoRef> implements ServerTodoPresenterFactory<TodoRef> {
  constructor(
    private readonly refEncoder: Encoder<TodoRef>,
  ) { }

  createTodo(view: CreateTodoPresenterOutput): CreateTodoInteractorOutput<TodoRef> {
    const errors = {
      EmptyLabel: 'EmptyLabel',
      StoringError: 'UnknownError',
    } as const
    return {
      render: (response) => view.render(response.success ?
        { success: true, ref: this.refEncoder.encode(response.ref) } : { success: false, error: errors[response.error] }),
    }
  }
  listTodo(view: ListTodoPresenterOutput): ListTodoInteractorOutput<TodoRef> {
    return {
      render: (response) => view.render(
        {
          success: true, list: response.list.map(({ todo, ref }) => ({
            id: this.refEncoder.encode(ref),
            label: todo.title,
            completed: todo.completed,
          }))
        }),
    }
  }

}
