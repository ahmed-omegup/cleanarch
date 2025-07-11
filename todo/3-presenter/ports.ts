import { TodoDom } from "../1-entities";
import { CreateTodoInteractorOutput, ListTodoInteractorOutput, ToggleTodoInteractorOutput } from "./deps";


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
  | { success: false; error: string };

export type ToggleTodoResponse =
  | { success: true; completed: boolean; }
  | { success: false; error: string };

export interface CreateTodoPresenterOutput {
  render(response: CreateTodoResponse): void;
}

export interface ListTodoPresenterOutput {
  render(response: ListTodoResponse): void;
}

export interface ToggleTodoPresenterOutput {
  render(response: ToggleTodoResponse): void;
}

export interface TodoPresenterFactory<TodoEntity extends TodoDom['Entity'], Error> {
  createTodo(view: CreateTodoPresenterOutput): CreateTodoInteractorOutput<TodoEntity, Error>;
  listTodo(view: ListTodoPresenterOutput): ListTodoInteractorOutput<TodoEntity, Error>;
  toggleTodo(view: ToggleTodoPresenterOutput): ToggleTodoInteractorOutput<Error>;
}

