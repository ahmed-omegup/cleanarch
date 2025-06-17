import { TodoDom } from "../deps";

export type ToggleTodoOutput<Error> =
  | { success: true; completed: boolean }
  | { success: false; error: Error };

export interface ToggleTodoInput<TodoRef extends TodoDom['Ref']> {
  ref: TodoRef;
}

export interface ToggleTodoInteractorOutput<Error> {
  render(output: ToggleTodoOutput<Error>): void;
}

export interface ToggleTodoInteractorInput<TodoRef extends TodoDom['Ref']> {
  execute(input: ToggleTodoInput<TodoRef>): void;
}

export type ToggleTodoFactory<TodoRef extends TodoDom['Ref'], Error> = {
  make(actors: { presenter: ToggleTodoInteractorOutput<Error> }): ToggleTodoInteractorInput<TodoRef>
}