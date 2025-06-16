import { CreateTodoInteractorInput, CreateTodoInteractorOutput, ListTodoInteractorInput, ListTodoInteractorOutput, TodoDom, TodoInteractorFactory } from "./deps";
import { RemoteOutput } from "./ports";

export class RemoteTodoInteractorFactory<TodoEntity extends TodoDom['Entity']> implements TodoInteractorFactory<TodoEntity> {
  constructor(private gateway: RemoteOutput<TodoEntity>) { }
  createTodo(actors: { presenter: CreateTodoInteractorOutput<TodoEntity>; }): CreateTodoInteractorInput {
    return {
      execute: async (todo) => {
        const response = await this.gateway.createTodo(todo);
        actors.presenter.render(response);
      }
    }
  }
  listTodo(actors: { presenter: ListTodoInteractorOutput<TodoEntity>; }): ListTodoInteractorInput {
    return {
      execute: async (query) => {
        const response = await this.gateway.listTodo(query);
        actors.presenter.render(response);
      }
    }
  }
} 