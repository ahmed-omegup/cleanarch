export type CreateTodoRequest = {
  label: string;
};
export type CreateTodoResponse =
  | { success: true; ref: string; }
  | { success: false; error: 'EmptyLabel' | 'UnknownError' };

export interface TodoController {
  createTodo(input: CreateTodoRequest): Promise<CreateTodoResponse>;
}

