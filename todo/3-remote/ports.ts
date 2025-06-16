import { CreateTodoInput, CreateTodoOutput, ListTodoInput, ListTodoOutput } from "./deps";

export interface RemoteOutput<Todo, TodoRef> {
  createTodo: (todo: CreateTodoInput) => Promise<CreateTodoOutput<Todo, TodoRef>>;
  listTodo: (query: ListTodoInput) => Promise<ListTodoOutput<Todo, TodoRef>>;
}