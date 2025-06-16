import { CreateTodoInput, CreateTodoOutput, ListTodoInput, ListTodoOutput, TodoDom } from "./deps";

export interface RemoteOutput<TodoEntity extends TodoDom['Entity'], Error> {
  createTodo: (todo: CreateTodoInput) => Promise<CreateTodoOutput<TodoEntity, Error>>;
  listTodo: (query: ListTodoInput) => Promise<ListTodoOutput<TodoEntity, Error>>;
}