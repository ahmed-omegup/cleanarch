import { CreateTodoInput, CreateTodoOutput, ListTodoInput, ListTodoOutput } from "./deps";

export interface RemoteOutput<TodoRef> {
  createTodo: (todo: CreateTodoInput) => Promise<CreateTodoOutput<TodoRef>>;
  listTodo: (query: ListTodoInput) => Promise<ListTodoOutput<TodoRef>>;
}