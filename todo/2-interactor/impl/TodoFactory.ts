import { TodoOps } from '../deps';
import { CreateTodoInteractorOutput, ListTodoInteractorOutput, TodoInteractorFactory } from '../ports';
import { TodoRepository } from '../ports/TodoRepository';
import { CreateTodoInteractorImpl } from './CreateTodo';
import { ListTodoInteractorImpl } from './ListTodo';

export class TodoInteractorFactoryImpl<Todo, TodoRef> implements TodoInteractorFactory<Todo, TodoRef> {
  constructor(private todoRepository: TodoRepository<Todo, TodoRef>, private ops: TodoOps<Todo>) { }
  createTodo(props: { presenter: CreateTodoInteractorOutput<Todo, TodoRef> }) {
    return new CreateTodoInteractorImpl<Todo, TodoRef>(this.todoRepository, props.presenter, this.ops);
  };
  listTodo(props: { presenter: ListTodoInteractorOutput<Todo, TodoRef> }) {
    return new ListTodoInteractorImpl<Todo, TodoRef>(this.todoRepository, props.presenter);
  }
}