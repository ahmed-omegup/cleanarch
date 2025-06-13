export type CreateTodoRequest = {
  label: string;
};
export type CreateTodoResponse<TodoRef> =
  | { success: true; ref: TodoRef; }
  | { success: false; error: 'EmptyLabel' | 'UnknownError' };

export interface TodoController<TodoRef> {
  createTodo(input: CreateTodoRequest): Promise<CreateTodoResponse<TodoRef>>;
}

