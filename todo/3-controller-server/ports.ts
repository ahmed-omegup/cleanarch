import { CreateTodoInteractorOutput, ListTodoInteractorOutput } from "./interactor";

export type CreateTodoRequest = {
  label: string;
};

export interface CreateTodoServerController {
  run(input: CreateTodoRequest): void;
}

export type ListTodoRequest = {
};

export interface ListTodoServerController {
  run(input: ListTodoRequest): void;
}

export interface TodoControllerFactory<TodoRef> {
  createTodo(presenter: CreateTodoInteractorOutput<TodoRef>): CreateTodoServerController;
  listTodo(presenter: ListTodoInteractorOutput<TodoRef>): ListTodoServerController;
}
