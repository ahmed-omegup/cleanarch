import { TodoDom } from "../deps";
import { ListTodoInput, ListTodoInteractorInput, ListTodoInteractorOutput, TodoRepository } from "../ports";

export class ListTodoInteractorImpl<Todo extends TodoDom> implements ListTodoInteractorInput {
  constructor(private todoRepository: TodoRepository<Todo>, private presenter: ListTodoInteractorOutput<Todo['Entity'], 'StoringError'>) { }

  async execute({ }: ListTodoInput) {
    try {
      const list = await this.todoRepository.list()
      this.presenter.render({ success: true, list });
    } catch {
      this.presenter.render({ success: false, error: 'StoringError' });
    }
  }
}