import { CreateTodoPresenter } from "../interactor";
import { CreateTodoController } from "./TodoController";

export interface TodoControllerFactory<TodoRef> {
  createTodo(presenter: CreateTodoPresenter<TodoRef>): CreateTodoController;
}
