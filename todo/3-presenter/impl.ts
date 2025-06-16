import { TodoOps } from "../1-entities";
import { CreateTodoInteractorOutput, ListTodoInteractorOutput } from "./deps";
import { Encoder, ListTodoPresenterOutput } from "./ports";
import { CreateTodoPresenterOutput, TodoPresenterFactory } from "./ports";

export class TodoPresenter<Todo, TodoRef> implements TodoPresenterFactory<Todo, TodoRef> {
  constructor(
    private readonly refEncoder: Encoder<TodoRef>,
    private readonly ops: TodoOps<Todo>,
  ) { }

  createTodo(view: CreateTodoPresenterOutput): CreateTodoInteractorOutput<Todo, TodoRef> {
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
  listTodo(view: ListTodoPresenterOutput): ListTodoInteractorOutput<Todo, TodoRef> {
    return {
      render: (response) => view.render(
        {
          success: true, list: response.list.map(({ todo, ref }) => ({
            key: this.refEncoder.encode(ref),
            label: this.ops.getTitle(todo),
            completed: this.ops.isCompleted(todo),
          }))
        }),
    }
  }

}
