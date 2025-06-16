import { ListTodoInput, ListTodoInteractorInput, ListTodoInteractorOutput, TodoRepository } from "../ports";

export class ListTodoInteractorImpl<Todo, TodoRef> implements ListTodoInteractorInput {
  constructor(private todoRepository: TodoRepository<Todo, TodoRef>, private presenter: ListTodoInteractorOutput<Todo, TodoRef>) { }

  async execute({ }: ListTodoInput) {
    const list = await this.todoRepository.list()
    this.presenter.render({ success: true, list });
  }
}