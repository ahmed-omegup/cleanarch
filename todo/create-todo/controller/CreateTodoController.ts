export type CreateTodoRequest = {
  label: string;
};
export type CreateTodoResponse<TodoRef> =
  | { success: true; ref: TodoRef; }
  | { success: false; error: 'EmptyLabel' | 'UnknownError' };

export interface CreateTodoController<TodoRef> {
  handle(input: CreateTodoRequest): Promise<CreateTodoResponse<TodoRef>>;
}

