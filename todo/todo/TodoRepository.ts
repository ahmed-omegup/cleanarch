
export type TodoRaw = {
  label: string;
  completed: boolean;
};

export interface TodoRepository<TodoRef> {
  save(todo: TodoRaw): Promise<TodoRef>;
  get(ref: TodoRef): Promise<TodoRaw | null>;
}
