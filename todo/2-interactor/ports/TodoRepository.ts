import { Todo } from "../entities";

export interface TodoRepository<TodoRef> {
  save(todo: Todo): Promise<TodoRef>;
  get(ref: TodoRef): Promise<Todo | null>;
}
