import { Todo } from "../entities";
import { CreateTodoInteractor, CreateTodoInput, CreateTodoPresenter, TodoRepository } from "../ports";

export class CreateTodoInteractorImpl<TodoRef> implements CreateTodoInteractor {
  constructor(private todoRepository: TodoRepository<TodoRef>, private presenter: CreateTodoPresenter<TodoRef>) { }

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