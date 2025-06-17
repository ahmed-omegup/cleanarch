import { TodoDom, TodoOps } from "../1-entities";
import { CreateTodoInteractorOutput, ListTodoInteractorOutput, ToggleTodoInteractorOutput } from "./deps";
import { Encoder, ListTodoPresenterOutput, ToggleTodoPresenterOutput } from "./ports";
import { CreateTodoPresenterOutput, TodoPresenterFactory } from "./ports";

export class TodoPresenter<Todo extends TodoDom, Error> implements TodoPresenterFactory<Todo['Entity'], Error> {
  constructor(
    private readonly refEncoder: Encoder<Todo['Ref']>,
    private readonly ops: TodoOps<Todo>,
    private readonly errorHandler: (e: Error) => string
  ) { }

  createTodo(view: CreateTodoPresenterOutput): CreateTodoInteractorOutput<Todo['Entity'], Error> {
    return {
      render: (response) => view.render(response.success ?
        { success: true } : { success: false, output: response.error === 'EmptyLabel' ? 'Label Can\'t be empty' : this.errorHandler(response.error) }),
    }
  }
  listTodo(view: ListTodoPresenterOutput): ListTodoInteractorOutput<Todo['Entity'], Error> {
    return {
      render: (response) => view.render(
        response.success ?
        {
          success: true, list: response.list.map(todo => ({
            key: this.refEncoder.encode(this.ops.ref(todo)),
            label: this.ops.getTitle(this.ops.model(todo)),
            completed: this.ops.isCompleted(this.ops.model(todo)),
          }))
        }:
        { success: false, error: this.errorHandler(response.error) }),
    }
  }

  toggleTodo(view: ToggleTodoPresenterOutput): ToggleTodoInteractorOutput<Error> {
    return {
      render: (response) => view.render(
        response.success ?
        { success: true, completed: response.completed } :
        { success: false, error: this.errorHandler(response.error) }),
    }
  }

}
