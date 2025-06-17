import { CreateTodoRequest, CreateTodoResponse, ListTodoRequest, ToggleTodoRequest, ToggleTodoResponse, ListTodoResponse, RemoteOutput, TodoDom, TodoDTO } from "./deps";

type Protocol<Error> = {
  createTodo: (todo: CreateTodoRequest) => Promise<CreateTodoResponse<Error>>;
  listTodo: (query: ListTodoRequest) => Promise<ListTodoResponse<Error>>;
  toggleTodo: (query: ToggleTodoRequest) => Promise<ToggleTodoResponse<Error>>;
}

const simulateNetwork = () => {
  if (Math.random() < 0.2) throw new Error('NetworkError'); // Simulate network error
  return new Promise(resolve => setTimeout(resolve, 100));
}

export const todoClient = <Error>(medium: Protocol<Error>): RemoteOutput<TodoDTO & TodoDom['Entity'], TodoDTO['id'] & TodoDom['Ref'], Error | 'NetworkError'> => ({
  async createTodo(todo) {
    try {
      await simulateNetwork();
      const result = await medium.createTodo({ label: todo.label })
      return result.success ? { success: true, todo: { id: result.ref, ...todo, completed: false } } : { success: false, error: result.error }
    } catch {
      return { success: false, error: 'NetworkError' }
    }
  },
  async listTodo(query) {
    try {
      await simulateNetwork();
      return medium.listTodo(query)
    } catch {
      return { success: false, error: 'NetworkError' }
    }
  },
  async toggleTodo(query) {
    try {
      await simulateNetwork();
      return medium.toggleTodo(query)
    } catch {
      return { success: false, error: 'NetworkError' }
    }
  },
});
