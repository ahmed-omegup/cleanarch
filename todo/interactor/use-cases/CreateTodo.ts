import { Todo } from "../../todo";

export type CreateTodoOutput<TodoRef, E> =
  | { success: true; todo: Todo; ref: TodoRef }
  | { success: false; error: 'EmptyLabel' | E };

export interface CreateTodoInput {
  label: string;
}

export interface CreateTodoPresenter<TodoRef, E = never> {
  render(output: CreateTodoOutput<TodoRef, E>): void;
}

export interface CreateTodoInteractor {
  execute(input: CreateTodoInput): void;
}

export type CreateTodoFactory<TodoRef> = {
  make(actors: { presenter: CreateTodoPresenter<TodoRef> }): CreateTodoInteractor
}