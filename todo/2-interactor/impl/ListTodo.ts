import { ListTodoInput, ListTodoInteractorInput, ListTodoInteractorOutput, TodoRepository } from "../ports";

export class ListTodoInteractorImpl<TodoRef> implements ListTodoInteractorInput {
  constructor(private todoRepository: TodoRepository<TodoRef>, private presenter: ListTodoInteractorOutput<TodoRef>) { }

  async execute({ }: ListTodoInput) {
    const list = await this.todoRepository.list()
    this.presenter.render({ success: true, list });
  }
}