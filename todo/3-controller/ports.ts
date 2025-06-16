import { CreateTodoInteractorOutput, ListTodoInteractorOutput, TodoDom } from "./deps";

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

export interface TodoControllerFactory<TodoEntity extends TodoDom['Entity']> {
  createTodo(presenter: CreateTodoInteractorOutput<TodoEntity>): CreateTodoControllerInput;
  listTodo(presenter: ListTodoInteractorOutput<TodoEntity>): ListTodoControllerInput;
}

