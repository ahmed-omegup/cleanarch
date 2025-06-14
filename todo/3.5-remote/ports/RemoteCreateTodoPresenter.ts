import { CreateTodoPresenter } from "../interactor";

export type RemoteCreateTodoPresenter<TodoRef> = CreateTodoPresenter<TodoRef> & {
  render(output: { success: false; error: 'NetworkError' }): void;
}
