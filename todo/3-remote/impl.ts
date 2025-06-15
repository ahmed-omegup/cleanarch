import { CreateTodoInteractorInput, CreateTodoInteractorOutput, ListTodoInteractorInput, ListTodoInteractorOutput, TodoInteractorFactory } from "./deps";
import { RemoteOutput } from "./ports";

export class RemoteTodoInteractorFactory<TodoRef> implements TodoInteractorFactory<TodoRef> {
  constructor(private gateway: RemoteOutput<TodoRef>) { }
  createTodo(actors: { presenter: CreateTodoInteractorOutput<TodoRef>; }): CreateTodoInteractorInput {
    return {
      execute: async (todo) => {
        const response = await this.gateway.createTodo(todo);
        actors.presenter.render(response);
      }
    }
  }
  listTodo(actors: { presenter: ListTodoInteractorOutput<TodoRef>; }): ListTodoInteractorInput {
    return {
      execute: async (query) => {
        const response = await this.gateway.listTodo(query);
        actors.presenter.render(response);
      }
    }
  }
} 