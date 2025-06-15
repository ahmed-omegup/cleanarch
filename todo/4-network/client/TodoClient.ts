import { CreateTodoRequest, ListTodoRequest, TodoControllerFactory } from "../controller";
import { CreateTodoResponse, Encoder, ListTodoResponse } from "../presenter";
import { Todo } from "../../1-entities";
import { RemoteOutput } from "../../3-remote";

type Protocol = {
  createTodo: (todo: CreateTodoRequest) => Promise<CreateTodoResponse>;
  listTodo: (query: ListTodoRequest) => Promise<ListTodoResponse>;
}

export const todoClient = <TodoRef>(encoder: Encoder<TodoRef>, medium: Protocol): RemoteOutput<TodoRef> => ({
  async createTodo(todo) {
    const x = await medium.createTodo({ label: todo.label })
    return x.success ? { success: true, ref: encoder.decode(x.ref), todo: new Todo(todo.label, false) } : { success: false, error: x.error }
  },
  async listTodo(query) {
    const x = await medium.listTodo(query)
    return { success: true, list: x.list.map(x => ({ ref: encoder.decode(x.id), todo: new Todo(x.label, x.completed) })) }

  }
});
