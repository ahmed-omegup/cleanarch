import { CreateTodoInteractorOutput, ListTodoInteractorOutput, TodoDom, ToggleTodoInteractorOutput } from "./deps";

export type CreateTodoRequest = {
  label: string;
};
export interface CreateTodoControllerInput {
  run(input: CreateTodoRequest): void;
}

export type ListTodoRequest = {
};
export type ToggleTodoRequest = {
  ref: string
};
export interface ListTodoControllerInput {
  run(input: ListTodoRequest): void;
}

export interface ToggleTodoControllerInput {
  run(input: ToggleTodoRequest): void;
}

export interface TodoControllerFactory<TodoEntity extends TodoDom['Entity'], Error> {
  createTodo(presenter: CreateTodoInteractorOutput<TodoEntity, Error>): CreateTodoControllerInput;
  listTodo(presenter: ListTodoInteractorOutput<TodoEntity, Error>): ListTodoControllerInput;
  toggleTodo(presenter: ToggleTodoInteractorOutput<Error>): ToggleTodoControllerInput;
}

