export interface TodoRepository<Todo, TodoRef> {
  save(todo: Todo): Promise<TodoRef>;
  get(ref: TodoRef): Promise<Todo | null>;
  list(): Promise<{ todo: Todo; ref: TodoRef }[]>;
}
