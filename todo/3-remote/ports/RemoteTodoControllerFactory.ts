import { CreateTodoControllerInput } from "../controller";
import { RemoteCreateTodoPresenter } from "./RemoteCreateTodoPresenter";

export interface RemoteTodoControllerFactory<TodoRef> {
  createTodo(presenter: RemoteCreateTodoPresenter<TodoRef>): CreateTodoControllerInput;
}
