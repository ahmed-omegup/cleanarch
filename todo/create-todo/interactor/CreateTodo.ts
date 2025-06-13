import { Todo } from "../../todo";

export type CreateTodoOutput<TodoRef> =
  | { success: true; todo: Todo; ref: TodoRef }
  | { success: false; error: 'EmptyLabel' };

export interface CreateTodoInput {
  label: string;
}

export interface CreateTodoPresenter<TodoRef> {
  render(output: CreateTodoOutput<TodoRef>): void;
}

export interface CreateTodoFactory<TodoRef> {
  create(actors: { presenter: CreateTodoPresenter<TodoRef> }): CreateTodo;
}

export interface CreateTodo {
  execute(input: CreateTodoInput): void;
}

