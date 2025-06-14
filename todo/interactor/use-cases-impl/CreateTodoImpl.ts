import { Todo, TodoRepository } from "../../todo";
import { CreateTodoInteractor, CreateTodoInput, CreateTodoPresenter } from "../use-cases/CreateTodo";

export class CreateTodoInteractorImpl<TodoRef> implements CreateTodoInteractor {
  constructor(private todoRepository: TodoRepository<TodoRef>, private presenter: CreateTodoPresenter<TodoRef>) { }

  async execute(input: CreateTodoInput) {
    if (!input.label.trim()) {
      this.presenter.render({ success: false, error: 'EmptyLabel' });
    } else {
      const todo = new Todo(input.label, false);
      const ref = await this.todoRepository.save(todo);
      this.presenter.render({ success: true, todo, ref });
    }
  }
}