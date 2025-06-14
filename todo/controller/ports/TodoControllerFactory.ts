import { CreateTodoPresenter } from "../../interactor";
import { CreateTodoController } from "./TodoController";

export interface TodoControllerFactory<TodoRef, E = never> {
  createTodo(presenter: CreateTodoPresenter<TodoRef, E>): CreateTodoController;
}
