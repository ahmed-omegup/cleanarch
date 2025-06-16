import { TodoDom, TodoOps } from "../deps";
import { CreateTodoInteractorInput, CreateTodoInput, CreateTodoInteractorOutput, TodoRepository } from "../ports";

export class CreateTodoInteractorImpl<Todo extends TodoDom> implements CreateTodoInteractorInput {
  constructor(private todoRepository: TodoRepository<Todo>, private presenter: CreateTodoInteractorOutput<Todo['Entity'], 'StoringError'>, private ops: TodoOps<Todo>) { }

  async execute(input: CreateTodoInput) {
    if (!input.label.trim()) {
      this.presenter.render({ success: false, error: 'EmptyLabel' });
    } else {
      const todoModel = this.ops.create(input.label, false);
      try {
        const todo = await this.todoRepository.save(todoModel);
        this.presenter.render({ success: true, todo });
      } catch (error) {
        console.error('Error saving todo:', error);
        this.presenter.render({ success: false, error: 'StoringError' });
      }
    }
  }
}