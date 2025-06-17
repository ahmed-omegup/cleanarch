import { TodoLogic, TodoLogicDom } from "../deps";
import { TodoRepository, ToggleTodoInput, ToggleTodoInteractorInput, ToggleTodoInteractorOutput } from "../ports";

export class ToggleTodoInteractorImpl<Todo extends TodoLogicDom> implements ToggleTodoInteractorInput<Todo['Ref']> {
  constructor(private todoRepository: TodoRepository<Todo>, private presenter: ToggleTodoInteractorOutput<'StoringError' | 'NotFound'>, private ops: TodoLogic<Todo>) { }

  async execute(input: ToggleTodoInput<Todo['Ref']>) {
    try {
      const todo = await this.todoRepository.get(input.ref);
      if (!todo) {
        this.presenter.render({ success: false, error: 'NotFound' });
        return;
      }
      const patch = this.ops.toggle(todo);
      await this.todoRepository.patch(input.ref, patch)

      this.presenter.render({ success: true, completed: this.ops.isCompleted(this.ops.patch(this.ops.model(todo), patch)) });
    } catch (error) {
      console.error('Error saving todo:', error);
      this.presenter.render({ success: false, error: 'StoringError' });
    }
  }
}