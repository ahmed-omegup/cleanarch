export type CreateTodoRequest = {
  label: string;
};
export interface CreateTodoController {
  run(input: CreateTodoRequest): void;
}


