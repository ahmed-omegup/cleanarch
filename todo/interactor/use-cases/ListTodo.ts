import { Todo } from "../../todo";

export type ListTodoOutput<TodoRef, E> =
  | { success: true; list: { todo: Todo; ref: TodoRef }[] }
  | { success: false; error: E };

export interface ListTodoInput {
  label: string;
}

export interface ListTodoPresenter<TodoRef, E = never> {
  render(output: ListTodoOutput<TodoRef, E>): void;
}

export interface ListTodoInteractor {
  execute(input: ListTodoInput): void;
}

export type ListTodoFactory<TodoRef> = {
  make(actors: { presenter: ListTodoPresenter<TodoRef> }): ListTodoInteractor
}