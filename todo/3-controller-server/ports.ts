import { CreateTodoInteractorOutput, ListTodoInteractorOutput, TodoDom, ToggleTodoInteractorOutput } from "./deps";

export type CreateTodoRequest = {
  label: string;
};

export interface CreateTodoServerController {
  run(input: CreateTodoRequest): void;
}

export type ListTodoRequest = {
};

export type ToggleTodoRequest = {
  ref: string
};

export interface ListTodoServerController {
  run(input: ListTodoRequest): void;
}


export interface ToggleTodoServerController {
  run(input: ToggleTodoRequest): void;
}

export interface TodoServerControllerFactory<TodoEntity extends TodoDom['Entity'], Error> {
  createTodo(presenter: CreateTodoInteractorOutput<TodoEntity, Error>): CreateTodoServerController;
  listTodo(presenter: ListTodoInteractorOutput<TodoEntity, Error>): ListTodoServerController;
  toggleTodo(presenter: ToggleTodoInteractorOutput<Error>): ToggleTodoServerController;
}
