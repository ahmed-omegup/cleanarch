import { CreateTodoInteractorOutput, ListTodoInteractorOutput, TodoDom } from "./deps";

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

export interface TodoServerControllerFactory<TodoEntity extends TodoDom['Entity']> {
  createTodo(presenter: CreateTodoInteractorOutput<TodoEntity>): CreateTodoServerController;
  listTodo(presenter: ListTodoInteractorOutput<TodoEntity>): ListTodoServerController;
}
