import { CreateTodoPresenter } from "../interactor";
import { CreateTodoView, TodoPresenterFactory } from "./ports/TodoPresenterFactory";

export type Encoder<T> = {
  encode: (x: T) => string
  decode: (x: string) => T
}
export class TodoPresenterImpl<TodoRef> implements TodoPresenterFactory<TodoRef> {
  constructor(
    private readonly refEncoder: Encoder<TodoRef>,
  ) { }

  createTodo(view: CreateTodoView): CreateTodoPresenter<TodoRef, 'UnknownError'> {
    return {
      render: (response) => view.render(response.success ?
        { success: true, ref: this.refEncoder.encode(response.ref) } : { success: false, error: response.error }),
    }
  }

}
