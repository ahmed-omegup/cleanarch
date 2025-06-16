import { CreateTodoRequest, CreateTodoResponse, Encoder, ListTodoRequest, ListTodoResponse, RemoteOutput, Todo } from "./deps";

type Protocol = {
  createTodo: (todo: CreateTodoRequest) => Promise<CreateTodoResponse>;
  listTodo: (query: ListTodoRequest) => Promise<ListTodoResponse>;
}

export const todoClient = <TodoRef>(encoder: Encoder<TodoRef>, medium: Protocol): RemoteOutput<TodoRef> => ({
  async createTodo(todo) {
    const result = await medium.createTodo({ label: todo.label })
    return result.success ? { success: true, ref: encoder.decode(result.ref), todo: new Todo(todo.label, false) } : { success: false, error: result.error }
  },
  async listTodo(query) {
    const result = await medium.listTodo(query)
    return { success: true, list: result.list.map(x => ({ ref: encoder.decode(x.id), todo: new Todo(x.label, x.completed) })) }

  }
});
