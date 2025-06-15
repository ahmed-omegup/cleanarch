import { Todo } from "../../1-entities";

export type ListTodoOutput<TodoRef> =
  | { success: true; list: { todo: Todo; ref: TodoRef }[] }

export interface ListTodoInput {
}

export interface ListTodoInteractorOutput<TodoRef> {
  render(output: ListTodoOutput<TodoRef>): void;
}

export interface ListTodoInteractorInput {
  execute(input: ListTodoInput): void;
}

