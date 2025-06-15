import { Todo } from "../deps";

export type CreateTodoOutput<TodoRef> =
  | { success: true; todo: Todo; ref: TodoRef }
  | { success: false; error: 'EmptyLabel' | 'StoringError' | 'UnknownError' };

export interface CreateTodoInput {
  label: string;
}

export interface CreateTodoInteractorOutput<TodoRef> {
  render(output: CreateTodoOutput<TodoRef>): void;
}

export interface CreateTodoInteractorInput {
  execute(input: CreateTodoInput): void;
}

export type CreateTodoFactory<TodoRef> = {
  make(actors: { presenter: CreateTodoInteractorOutput<TodoRef> }): CreateTodoInteractorInput
}