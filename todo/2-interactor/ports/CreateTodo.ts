import { Todo } from "../../1-entities";

export type CreateTodoOutput<TodoRef> =
  | { success: true; todo: Todo; ref: TodoRef }
  | { success: false; error: 'EmptyLabel' | 'StoringError' };

export interface CreateTodoInput {
  label: string;
}

export interface CreateTodoPresenter<TodoRef> {
  render(output: CreateTodoOutput<TodoRef>): void;
}

export interface CreateTodoInteractor {
  execute(input: CreateTodoInput): void;
}

export type CreateTodoFactory<TodoRef> = {
  make(actors: { presenter: CreateTodoPresenter<TodoRef> }): CreateTodoInteractor
}