import { CreateTodoInput, CreateTodoOutput, ListTodoInput, ListTodoOutput } from "./interactor";

export interface RemoteOutput<TodoRef> {
  createTodo: (todo: CreateTodoInput) => Promise<CreateTodoOutput<TodoRef>>;
  listTodo: (query: ListTodoInput) => Promise<ListTodoOutput<TodoRef>>;
}