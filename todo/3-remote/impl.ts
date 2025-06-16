import { CreateTodoInteractorInput, CreateTodoInteractorOutput, ListTodoInteractorInput, ListTodoInteractorOutput, TodoInteractorFactory } from "./deps";
import { RemoteOutput } from "./ports";

export class RemoteTodoInteractorFactory<Todo, TodoRef> implements TodoInteractorFactory<Todo, TodoRef> {
  constructor(private gateway: RemoteOutput<Todo, TodoRef>) { }
  createTodo(actors: { presenter: CreateTodoInteractorOutput<Todo, TodoRef>; }): CreateTodoInteractorInput {
    return {
      execute: async (todo) => {
        const response = await this.gateway.createTodo(todo);
        actors.presenter.render(response);
      }
    }
  }
  listTodo(actors: { presenter: ListTodoInteractorOutput<Todo, TodoRef>; }): ListTodoInteractorInput {
    return {
      execute: async (query) => {
        const response = await this.gateway.listTodo(query);
        actors.presenter.render(response);
      }
    }
  }
} 