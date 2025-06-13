export class Todo {
  constructor(
    public title: string,
    public completed: boolean
  ) {}

  toggle(): void {
    this.completed = !this.completed;
  }
}
