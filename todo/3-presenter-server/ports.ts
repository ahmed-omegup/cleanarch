import { CreateTodoInteractorOutput, ListTodoInteractorOutput } from "./deps";


export type Encoder<T> = {
  encode: (x: T) => string
  decode: (x: string) => T
}

export type TodoDTO = {
  id: string
  label: string;
  completed: boolean;
};

export type CreateTodoResponse =
  | { success: true; ref: string; }
  | { success: false; error: 'EmptyLabel' | 'UnknownError' };

export type ListTodoResponse =
  | { success: true; list: TodoDTO[]; }

export interface CreateTodoPresenterOutput {
  render(response: CreateTodoResponse): void;
}

export interface ListTodoPresenterOutput {
  render(response: ListTodoResponse): void;
}

export interface ServerTodoPresenterFactory<TodoRef> {
  createTodo(view: CreateTodoPresenterOutput): CreateTodoInteractorOutput<TodoRef>;
  listTodo(view: ListTodoPresenterOutput): ListTodoInteractorOutput<TodoRef>;
}

