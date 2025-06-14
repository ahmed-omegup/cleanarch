import { CreateTodoController } from "../controller";
import { RemoteCreateTodoPresenter } from "./RemoteCreateTodoPresenter";

export interface RemoteTodoControllerFactory<TodoRef> {
  createTodo(presenter: RemoteCreateTodoPresenter<TodoRef>): CreateTodoController;
}
