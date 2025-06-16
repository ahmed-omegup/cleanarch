export type CreateTodoOutput<Todo, TodoRef> =
  | { success: true; todo: Todo, ref: TodoRef }
  | { success: false; error: 'EmptyLabel' | 'StoringError' | 'UnknownError' };

export interface CreateTodoInput {
  label: string;
}

export interface CreateTodoInteractorOutput<Todo, TodoRef> {
  render(output: CreateTodoOutput<Todo, TodoRef>): void;
}

export interface CreateTodoInteractorInput {
  execute(input: CreateTodoInput): void;
}

export type CreateTodoFactory<Todo, TodoRef> = {
  make(actors: { presenter: CreateTodoInteractorOutput<Todo, TodoRef> }): CreateTodoInteractorInput
}