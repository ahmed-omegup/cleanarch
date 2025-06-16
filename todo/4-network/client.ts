import { CreateTodoRequest, CreateTodoResponse, Encoder, ListTodoRequest, ListTodoResponse, RemoteOutput, TodoOps } from "./deps";

type Protocol = {
  createTodo: (todo: CreateTodoRequest) => Promise<CreateTodoResponse>;
  listTodo: (query: ListTodoRequest) => Promise<ListTodoResponse>;
}

export const todoClient = <Todo, TodoRef>(encoder: Encoder<TodoRef>, medium: Protocol, ops: TodoOps<Todo>): RemoteOutput<Todo, TodoRef> => ({
  async createTodo(todo) {
    const result = await medium.createTodo({ label: todo.label })
    return result.success ? { success: true, ref: encoder.decode(result.ref), todo: ops.create(todo.label, false) } : { success: false, error: result.error }
  },
  async listTodo(query) {
    const result = await medium.listTodo(query)
    return { success: true, list: result.list.map(x => ({ ref: encoder.decode(x.id), todo: ops.create(x.label, x.completed) })) }
  }
});
