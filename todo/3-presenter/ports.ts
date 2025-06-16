import { TodoDom } from "../1-entities";
import { CreateTodoInteractorOutput, ListTodoInteractorOutput } from "./deps";


export type Encoder<T> = {
  encode: (x: T) => string
  decode: (x: string) => T
}

export type TodoDTO = {
  key: string
  label: string;
  completed: boolean;
};

export type CreateTodoResponse =
  | { success: true }
  | { success: false; output: string };

export type ListTodoResponse =
  | { success: true; list: TodoDTO[]; }

export interface CreateTodoPresenterOutput {
  render(response: CreateTodoResponse): void;
}

export interface ListTodoPresenterOutput {
  render(response: ListTodoResponse): void;
}

export interface TodoPresenterFactory<TodoEntity extends TodoDom['Entity']> {
  createTodo(view: CreateTodoPresenterOutput): CreateTodoInteractorOutput<TodoEntity>;
  listTodo(view: ListTodoPresenterOutput): ListTodoInteractorOutput<TodoEntity>;
}

