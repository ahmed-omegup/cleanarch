import { CreateTodoInput, CreateTodoOutput, ListTodoInput, ListTodoOutput, TodoDom } from "./deps";

export interface RemoteOutput<TodoEntity extends TodoDom['Entity']> {
  createTodo: (todo: CreateTodoInput) => Promise<CreateTodoOutput<TodoEntity>>;
  listTodo: (query: ListTodoInput) => Promise<ListTodoOutput<TodoEntity>>;
}