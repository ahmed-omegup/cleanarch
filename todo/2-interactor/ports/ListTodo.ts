import { TodoDom } from "../deps";

export type ListTodoOutput<TodoEntity extends TodoDom['Entity'], Error> =
  | { success: true; list: TodoEntity[] }
  | { success: false; error: Error };
export interface ListTodoInput {
}

export interface ListTodoInteractorOutput<TodoEntity extends TodoDom['Entity'], in Error> {
  render(output: ListTodoOutput<TodoEntity, Error>): void;
}

export interface ListTodoInteractorInput {
  execute(input: ListTodoInput): void;
}

