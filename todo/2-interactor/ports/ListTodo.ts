import { TodoDom } from "../deps";

export type ListTodoOutput<TodoEntity extends TodoDom['Entity']> =
  | { success: true; list: TodoEntity[] }

export interface ListTodoInput {
}

export interface ListTodoInteractorOutput<TodoEntity extends TodoDom['Entity']> {
  render(output: ListTodoOutput<TodoEntity>): void;
}

export interface ListTodoInteractorInput {
  execute(input: ListTodoInput): void;
}

