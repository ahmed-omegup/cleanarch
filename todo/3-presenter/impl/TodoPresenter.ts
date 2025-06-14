import { CreateTodoPresenter } from "../interactor";
import { Encoder } from "../ports";
import { CreateTodoView, TodoPresenterFactory } from "../ports";

export class ServerTodoPresenter<TodoRef> implements TodoPresenterFactory<TodoRef> {
  constructor(
    private readonly refEncoder: Encoder<TodoRef>,
  ) { }

  createTodo(view: CreateTodoView): CreateTodoPresenter<TodoRef> {
    const errors = {
      EmptyLabel: 'EmptyLabel',
      StoringError: 'UnknownError',
    } as const
    return {
      render: (response) => view.render(response.success ?
        { success: true, ref: this.refEncoder.encode(response.ref) } : { success: false, error: errors[response.error] }),
    }
  }

}
