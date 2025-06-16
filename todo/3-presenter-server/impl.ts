import { CreateTodoInteractorOutput, ListTodoInteractorOutput, TodoDom, TodoOps } from "./deps";
import { Encoder, ListTodoPresenterOutput, CreateTodoPresenterOutput, ServerTodoPresenterFactory } from "./ports";

export class ServerTodoPresenter<Todo extends TodoDom, ServerError, InnerError> implements ServerTodoPresenterFactory<Todo['Entity'], ServerError, InnerError> {
  constructor(
    private readonly refEncoder: Encoder<Todo['Ref']>,
    private readonly ops: TodoOps<Todo>,
    private readonly errorHandler: (e: InnerError) => ServerError
  ) { }

  createTodo(view: CreateTodoPresenterOutput<ServerError>): CreateTodoInteractorOutput<Todo['Entity'], InnerError> {
    return {
      render: (response) => view.render(response.success ?
        { success: true, ref: this.refEncoder.encode(this.ops.ref(response.todo)) } : {
          success: false, error: response.error === 'EmptyLabel' ? 'EmptyLabel' : this.errorHandler(response.error)
        }),
    }
  }
  listTodo(view: ListTodoPresenterOutput<ServerError>): ListTodoInteractorOutput<Todo['Entity'], InnerError> {
    return {
      render: (response) => view.render(
        response.success ?
          {
            success: true, list: response.list.map((todo) => ({
              id: this.refEncoder.encode(this.ops.ref(todo)),
              label: this.ops.getTitle(this.ops.model(todo)),
              completed: this.ops.isCompleted(this.ops.model(todo)),
            }))
          }
          : { success: false, error: this.errorHandler(response.error) }),
    }
  }

}
