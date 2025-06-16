import { TodoDom } from "../deps";

export type CreateTodoOutput<TodoEntity extends TodoDom['Entity'], Error> =
  | { success: true; todo: TodoEntity }
  | { success: false; error: 'EmptyLabel' | Error };

export interface CreateTodoInput {
  label: string;
}

export interface CreateTodoInteractorOutput<TodoEntity extends TodoDom['Entity'], Error> {
  render(output: CreateTodoOutput<TodoEntity, Error>): void;
}

export interface CreateTodoInteractorInput {
  execute(input: CreateTodoInput): void;
}

export type CreateTodoFactory<TodoEntity extends TodoDom['Entity'], Error> = {
  make(actors: { presenter: CreateTodoInteractorOutput<TodoEntity, Error> }): CreateTodoInteractorInput
}