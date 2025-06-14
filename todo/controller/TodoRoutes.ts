import { z } from "zod";
import { createRoute, MRoutes } from "../../utils/route";
import { CreateTodoRequest } from "./ports/TodoController";
import { TodoControllerFactory } from "./ports/TodoControllerFactory";
import { CreateTodoResponse, TodoPresenterFactory } from "../presenter/ports/TodoPresenterFactory";

type Mutations = {
  createTodo: { request: CreateTodoRequest; response: CreateTodoResponse };
};
type Queries = {};


type Routes = MRoutes<Mutations, Queries>

export const todoRoutes = <TodoRef>(controller: TodoControllerFactory<TodoRef>, presenter: TodoPresenterFactory<TodoRef>): Routes => ({
  mutations: {
    createTodo: createRoute<CreateTodoRequest, CreateTodoResponse>({
      request: z.object({ label: z.string() }),
      exec: { handle: (input) => new Promise<CreateTodoResponse>(resolve => controller.createTodo(presenter.createTodo({ render: resolve })).run(input)) },
    }),
  },
  queries: {},
});
