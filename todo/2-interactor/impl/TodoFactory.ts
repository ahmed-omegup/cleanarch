import { TodoDom, TodoOps } from '../deps';
import { CreateTodoInteractorOutput, ListTodoInteractorOutput, TodoInteractorFactory } from '../ports';
import { TodoRepository } from '../ports/TodoRepository';
import { CreateTodoInteractorImpl } from './CreateTodo';
import { ListTodoInteractorImpl } from './ListTodo';

export class TodoInteractorFactoryImpl<Todo extends TodoDom> implements TodoInteractorFactory<Todo['Entity']> {
  constructor(private todoRepository: TodoRepository<Todo>, private ops: TodoOps<Todo>) { }
  createTodo(props: { presenter: CreateTodoInteractorOutput<Todo['Entity']> }) {
    return new CreateTodoInteractorImpl<Todo>(this.todoRepository, props.presenter, this.ops);
  };
  listTodo(props: { presenter: ListTodoInteractorOutput<Todo['Entity']> }) {
    return new ListTodoInteractorImpl<Todo>(this.todoRepository, props.presenter);
  }
}