import { TodoDom } from "../deps";

export type CreateTodoOutput<TodoEntity extends TodoDom['Entity']> =
  | { success: true; todo: TodoEntity }
  | { success: false; error: 'EmptyLabel' | 'StoringError' | 'UnknownError' };

export interface CreateTodoInput {
  label: string;
}

export interface CreateTodoInteractorOutput<TodoEntity extends TodoDom['Entity']> {
  render(output: CreateTodoOutput<TodoEntity>): void;
}

export interface CreateTodoInteractorInput {
  execute(input: CreateTodoInput): void;
}

export type CreateTodoFactory<TodoEntity extends TodoDom['Entity']> = {
  make(actors: { presenter: CreateTodoInteractorOutput<TodoEntity> }): CreateTodoInteractorInput
}