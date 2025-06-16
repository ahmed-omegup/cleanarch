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

export interface TodoControllerFactory<Todo, TodoRef> {
  createTodo(presenter: CreateTodoInteractorOutput<Todo, TodoRef>): CreateTodoControllerInput;
  listTodo(presenter: ListTodoInteractorOutput<Todo, TodoRef>): ListTodoControllerInput;
}

