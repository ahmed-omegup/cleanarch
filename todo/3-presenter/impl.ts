import { CreateTodoInteractorOutput, ListTodoInteractorOutput } from "./interactor";
import { Encoder, ListTodoPresenterOutput } from "./ports";
import { CreateTodoPresenterOutput, TodoPresenterFactory } from "./ports";

export class TodoPresenter<TodoRef> implements TodoPresenterFactory<TodoRef> {
  constructor(
    private readonly refEncoder: Encoder<TodoRef>,
  ) { }

  createTodo(view: CreateTodoPresenterOutput): CreateTodoInteractorOutput<TodoRef> {
    const errors = {
      EmptyLabel: 'Label Can\'t be empty',
      StoringError: 'Unknown Error while storing',
      UnknownError: 'Unknown Error'
    } as const
    return {
      render: (response) => view.render(response.success ?
        { success: true } : { success: false, output: errors[response.error] }),
    }
  }
  listTodo(view: ListTodoPresenterOutput): ListTodoInteractorOutput<TodoRef> {
    return {
      render: (response) => view.render(
        {
          success: true, list: response.list.map(({ todo, ref }) => ({
            id: this.refEncoder.encode(ref),
            label: todo.title,
            completed: todo.completed,
          }))
        }),
    }
  }

}
