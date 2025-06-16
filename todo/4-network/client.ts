import { CreateTodoRequest, CreateTodoResponse, ListTodoRequest, ListTodoResponse, RemoteOutput, TodoDom, TodoDTO } from "./deps";

type Protocol<Error> = {
  createTodo: (todo: CreateTodoRequest) => Promise<CreateTodoResponse<Error>>;
  listTodo: (query: ListTodoRequest) => Promise<ListTodoResponse<Error>>;
}

export const todoClient = <Error>(medium: Protocol<Error>): RemoteOutput<TodoDTO & TodoDom['Entity'], Error | 'NetworkError'> => ({
  async createTodo(todo) {
    try {
      if(Math.random() < 0.5) throw new Error('NetworkError'); // Simulate network error
      const result = await medium.createTodo({ label: todo.label })
      return result.success ? { success: true, todo: { id: result.ref, ...todo, completed: false } } : { success: false, error: result.error }
    } catch {
      return { success: false, error: 'NetworkError' }
    }
  },
  async listTodo(query) {
    try {
      if(Math.random() < 0.5) throw new Error('NetworkError'); // Simulate network error
      return medium.listTodo(query)
    } catch {
      return { success: false, error: 'NetworkError' }
    }
  }
});
