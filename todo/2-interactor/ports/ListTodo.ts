
export type ListTodoOutput<Todo, TodoRef> =
  | { success: true; list: { todo: Todo; ref: TodoRef }[] }

export interface ListTodoInput {
}

export interface ListTodoInteractorOutput<Todo, TodoRef> {
  render(output: ListTodoOutput<Todo, TodoRef>): void;
}

export interface ListTodoInteractorInput {
  execute(input: ListTodoInput): void;
}

