import { CreateTodoInput, CreateTodoOutput, ListTodoInput, ListTodoOutput, TodoDom, ToggleTodoInput, ToggleTodoOutput } from "./deps";

export interface RemoteOutput<TodoEntity extends TodoDom['Entity'], TodoRef extends TodoDom['Ref'], Error> {
  createTodo: (todo: CreateTodoInput) => Promise<CreateTodoOutput<TodoEntity, Error>>;
  listTodo: (query: ListTodoInput) => Promise<ListTodoOutput<TodoEntity, Error>>;
  toggleTodo: (query: ToggleTodoInput<TodoRef>) => Promise<ToggleTodoOutput<Error>>;
}