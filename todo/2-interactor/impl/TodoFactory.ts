import { TodoLogic, TodoLogicDom } from '../deps';
import { CreateTodoInteractorOutput, ListTodoInteractorOutput, TodoInteractorFactory, ToggleTodoInteractorOutput } from '../ports';
import { TodoRepository } from '../ports/TodoRepository';
import { CreateTodoInteractorImpl } from './CreateTodo';
import { ListTodoInteractorImpl } from './ListTodo';
import { ToggleTodoInteractorImpl } from './ToggleTodo';

export class TodoInteractorFactoryImpl<Todo extends TodoLogicDom> implements TodoInteractorFactory<Todo['Entity'], Todo['Ref'], 'StoringError'> {
  constructor(private todoRepository: TodoRepository<Todo>, private ops: TodoLogic<Todo>) { }
  createTodo(props: { presenter: CreateTodoInteractorOutput<Todo['Entity'], 'StoringError'> }) {
    return new CreateTodoInteractorImpl<Todo>(this.todoRepository, props.presenter, this.ops);
  };
  listTodo(props: { presenter: ListTodoInteractorOutput<Todo['Entity'], 'StoringError'> }) {
    return new ListTodoInteractorImpl<Todo>(this.todoRepository, props.presenter);
  }
  toggleTodo(props: { presenter: ToggleTodoInteractorOutput<'StoringError'> }) {
    return new ToggleTodoInteractorImpl<Todo>(this.todoRepository, props.presenter, this.ops);
  }
}