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

export interface TodoServerControllerFactory<TodoEntity extends TodoDom['Entity'], Error> {
  createTodo(presenter: CreateTodoInteractorOutput<TodoEntity, Error>): CreateTodoServerController;
  listTodo(presenter: ListTodoInteractorOutput<TodoEntity, Error>): ListTodoServerController;
}
