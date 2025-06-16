import { CreateTodoInteractorOutput, ListTodoInteractorOutput, TodoDom, TodoOps } from "./deps";
import { Encoder, ListTodoPresenterOutput, CreateTodoPresenterOutput, ServerTodoPresenterFactory } from "./ports";

export class ServerTodoPresenter<Todo extends TodoDom> implements ServerTodoPresenterFactory<Todo['Entity']> {
  constructor(
    private readonly refEncoder: Encoder<Todo['Ref']>,
    private readonly ops: TodoOps<Todo>,
  ) { }

  createTodo(view: CreateTodoPresenterOutput): CreateTodoInteractorOutput<Todo['Entity']> {
    const errors = {
      EmptyLabel: 'EmptyLabel',
      StoringError: 'UnknownError',
      UnknownError: 'UnknownError'
    } as const
    return {
      render: (response) => view.render(response.success ?
        { success: true, ref: this.refEncoder.encode(this.ops.ref(response.todo)) } : { success: false, error: errors[response.error] }),
    }
  }
  listTodo(view: ListTodoPresenterOutput): ListTodoInteractorOutput<Todo['Entity']> {
    return {
      render: (response) => view.render(
        {
          success: true, list: response.list.map((todo) => ({
            id: this.refEncoder.encode(this.ops.ref(todo)),
            label: this.ops.getTitle(this.ops.model(todo)),
            completed: this.ops.isCompleted(this.ops.model(todo)),
          }))
        }),
    }
  }

}
