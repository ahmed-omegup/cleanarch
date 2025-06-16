import { CreateTodoInteractorOutput, ListTodoInteractorOutput, TodoDom } from "./deps";


export type Encoder<T> = {
  encode: (x: T) => string
  decode: (x: string) => T
}

export type TodoDTO = {
  id: string
  label: string;
  completed: boolean;
};

export type CreateTodoResponse<Error> =
  | { success: true; ref: string; }
  | { success: false; error: 'EmptyLabel' | Error };

export type ListTodoResponse<Error> =
  | { success: true; list: TodoDTO[]; }
  | { success: false; error: Error };

export interface CreateTodoPresenterOutput<Error> {
  render(response: CreateTodoResponse<Error>): void;
}

export interface ListTodoPresenterOutput<Error> {
  render(response: ListTodoResponse<Error>): void;
}

export interface ServerTodoPresenterFactory<TodoEntity extends TodoDom['Entity'], ServerError, InnerError> {
  createTodo(view: CreateTodoPresenterOutput<ServerError>): CreateTodoInteractorOutput<TodoEntity, InnerError>;
  listTodo(view: ListTodoPresenterOutput<ServerError>): ListTodoInteractorOutput<TodoEntity, InnerError>;
}

