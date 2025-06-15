import { CreateTodoInteractorOutput } from "../interactor";

export type CreateTodoVM =
  | { ok: true; }
  | { ok: false; error: string };


export interface ClientCreateTodoView {
  render(response: CreateTodoVM): void;
}
export interface ClientTodoPresenterFactory<TodoRef> {
  createTodo(view: ClientCreateTodoView): CreateTodoInteractorOutput<TodoRef>;
}

