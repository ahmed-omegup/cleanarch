import { RemoteCreateTodoPresenter, ClientCreateTodoView, ClientTodoPresenterFactory } from "../ports";

export class ServerTodoPresenter<TodoRef> implements ClientTodoPresenterFactory<TodoRef> {
  constructor() { }

  createTodo(view: ClientCreateTodoView): RemoteCreateTodoPresenter<TodoRef> {
    const errors = {
      NetworkError: 'Network error occurred. Please try again later.',
      EmptyLabel: 'Todo label cannot be empty.',
    };
    return {
      render: (response) => view.render(response.success ?
        { ok: true } : { ok: false, error: errors[response.error] }),
    }
  }

}
