import { CreateTodoPresenter } from "../../interactor";

export type CreateTodoResponse =
  | { success: true; ref: string; }
  | { success: false; error: 'EmptyLabel' | 'UnknownError' };


export interface CreateTodoView {
  render(response: CreateTodoResponse): void;
}
export interface TodoPresenterFactory<TodoRef> {
  createTodo(view: CreateTodoView): CreateTodoPresenter<TodoRef>;
}

