// implement the factory
import { CreateTodoInteractorOutput, ListTodoInteractorOutput, TodoInteractorFactory } from '../ports';
import { TodoRepository } from '../ports/TodoRepository';
import { CreateTodoInteractorImpl } from './CreateTodo';
import { ListTodoInteractorImpl } from './ListTodo';

export class TodoInteractorFactoryImpl<TodoRef> implements TodoInteractorFactory<TodoRef> {
  constructor(private todoRepository: TodoRepository<TodoRef>) { }
  createTodo(props: { presenter: CreateTodoInteractorOutput<TodoRef> }) {
    return new CreateTodoInteractorImpl<TodoRef>(this.todoRepository, props.presenter);
  };
  listTodo(props: { presenter: ListTodoInteractorOutput<TodoRef> }) {
    return new ListTodoInteractorImpl<TodoRef>(this.todoRepository, props.presenter);
  }
}