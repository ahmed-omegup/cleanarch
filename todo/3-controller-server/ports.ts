import { CreateTodoInteractorOutput, ListTodoInteractorOutput } from "./deps";

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

export interface TodoServerControllerFactory<Todo, TodoRef> {
  createTodo(presenter: CreateTodoInteractorOutput<Todo, TodoRef>): CreateTodoServerController;
  listTodo(presenter: ListTodoInteractorOutput<Todo, TodoRef>): ListTodoServerController;
}
