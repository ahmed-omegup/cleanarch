import { Todo } from "../deps";
import { CreateTodoInteractorInput, CreateTodoInput, CreateTodoInteractorOutput, TodoRepository } from "../ports";

export class CreateTodoInteractorImpl<TodoRef> implements CreateTodoInteractorInput {
  constructor(private todoRepository: TodoRepository<TodoRef>, private presenter: CreateTodoInteractorOutput<TodoRef>) { }

  async execute(input: CreateTodoInput) {
    if (!input.label.trim()) {
      this.presenter.render({ success: false, error: 'EmptyLabel' });
    } else {
      const todo = new Todo(input.label, false);
      try {
        const ref = await this.todoRepository.save(todo);
        this.presenter.render({ success: true, todo, ref });
      } catch (error) {
        console.error('Error saving todo:', error);
        this.presenter.render({ success: false, error: 'StoringError' });
      }
    }
  }
}