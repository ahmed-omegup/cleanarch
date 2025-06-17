import { CreateTodoInteractorInput, CreateTodoInteractorOutput, ListTodoInteractorInput, ListTodoInteractorOutput, TodoDom, TodoInteractorFactory, ToggleTodoInteractorInput, ToggleTodoInteractorOutput } from "./deps";
import { RemoteOutput } from "./ports";

export class RemoteTodoInteractorFactory<TodoEntity extends TodoDom['Entity'], TodoRef extends TodoDom['Ref'], Error> implements TodoInteractorFactory<TodoEntity, TodoRef, Error> {
  constructor(private gateway: RemoteOutput<TodoEntity, TodoRef, Error>) { }
  createTodo(actors: { presenter: CreateTodoInteractorOutput<TodoEntity, Error>; }): CreateTodoInteractorInput {
    return {
      execute: async (todo) => {
        const response = await this.gateway.createTodo(todo);
        actors.presenter.render(response);
      }
    }
  }
  listTodo(actors: { presenter: ListTodoInteractorOutput<TodoEntity, Error>; }): ListTodoInteractorInput {
    return {
      execute: async (query) => {
        const response = await this.gateway.listTodo(query);
        actors.presenter.render(response);
      }
    }
  }
  toggleTodo(actors: { presenter: ToggleTodoInteractorOutput<Error>; }): ToggleTodoInteractorInput<TodoRef> {
    return {
      execute: async (query) => {
        const response = await this.gateway.toggleTodo(query);
        actors.presenter.render(response);
      }
    }
  }
} 