import { CreateTodoInteractorOutput } from "../deps";

export type RemoteCreateTodoPresenter<TodoRef> = CreateTodoInteractorOutput<TodoRef> & {
  render(output: { success: false; error: 'NetworkError' }): void;
}
