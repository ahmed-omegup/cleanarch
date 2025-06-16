import { TodoDom } from "../deps";
import { ListTodoInput, ListTodoInteractorInput, ListTodoInteractorOutput, TodoRepository } from "../ports";

export class ListTodoInteractorImpl<Todo extends TodoDom> implements ListTodoInteractorInput {
  constructor(private todoRepository: TodoRepository<Todo>, private presenter: ListTodoInteractorOutput<Todo['Entity']>) { }

  async execute({ }: ListTodoInput) {
    const list = await this.todoRepository.list()
    this.presenter.render({ success: true, list });
  }
}