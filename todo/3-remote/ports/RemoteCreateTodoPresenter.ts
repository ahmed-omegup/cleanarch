import { CreateTodoInteractorOutput } from "../interactor";

export type RemoteCreateTodoPresenter<TodoRef> = CreateTodoInteractorOutput<TodoRef> & {
  render(output: { success: false; error: 'NetworkError' }): void;
}
