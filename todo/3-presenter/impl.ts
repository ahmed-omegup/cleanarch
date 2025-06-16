import { TodoDom, TodoOps } from "../1-entities";
import { CreateTodoInteractorOutput, ListTodoInteractorOutput } from "./deps";
import { Encoder, ListTodoPresenterOutput } from "./ports";
import { CreateTodoPresenterOutput, TodoPresenterFactory } from "./ports";

export class TodoPresenter<Todo extends TodoDom> implements TodoPresenterFactory<Todo['Entity']> {
  constructor(
    private readonly refEncoder: Encoder<Todo['Ref']>,
    private readonly ops: TodoOps<Todo>,
  ) { }

  createTodo(view: CreateTodoPresenterOutput): CreateTodoInteractorOutput<Todo['Entity']> {
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
  listTodo(view: ListTodoPresenterOutput): ListTodoInteractorOutput<Todo['Entity']> {
    return {
      render: (response) => view.render(
        {
          success: true, list: response.list.map(todo => ({
            key: this.refEncoder.encode(this.ops.ref(todo)),
            label: this.ops.getTitle(this.ops.model(todo)),
            completed: this.ops.isCompleted(this.ops.model(todo)),
          }))
        }),
    }
  }

}
