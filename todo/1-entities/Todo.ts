export type TodoOps<Todo> = {
  create(title: string, completed: boolean): Todo;
  toggle(t: Todo): Todo;
  isCompleted(t: Todo): boolean;
  getTitle: (t: Todo) => string;
}