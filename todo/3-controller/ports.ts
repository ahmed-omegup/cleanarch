import { CreateTodoInteractorOutput, ListTodoInteractorOutput } from "./deps";

export type CreateTodoRequest = {
  label: string;
};
export interface CreateTodoControllerInput {
  run(input: CreateTodoRequest): void;
}

export type ListTodoRequest = {
};
export interface ListTodoControllerInput {
  run(input: ListTodoRequest): void;
}

export interface TodoControllerFactory<TodoRef> {
  createTodo(presenter: CreateTodoInteractorOutput<TodoRef>): CreateTodoControllerInput;
  listTodo(presenter: ListTodoInteractorOutput<TodoRef>): ListTodoControllerInput;
}

