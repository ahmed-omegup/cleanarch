import { CreateTodoRequest, CreateTodoResponse, ListTodoRequest, ListTodoResponse, RemoteOutput, TodoDom, TodoDTO } from "./deps";

type Protocol = {
  createTodo: (todo: CreateTodoRequest) => Promise<CreateTodoResponse>;
  listTodo: (query: ListTodoRequest) => Promise<ListTodoResponse>;
}

export const todoClient = (medium: Protocol): RemoteOutput<TodoDTO & TodoDom['Entity']> => ({
  async createTodo(todo) {
    const result = await medium.createTodo({ label: todo.label })
    return result.success ? { success: true, todo: { id: result.ref, ...todo, completed: false } } : { success: false, error: result.error }
  },
  async listTodo(query) {
    const result = await medium.listTodo(query)
    return { success: true, list: result.list }
  }
});
