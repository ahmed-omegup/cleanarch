import { z } from "zod";
import { createRoute, MRoutes } from "../../../utils/route";
import { CreateTodoRequest, TodoControllerFactory } from "../controller";
import { CreateTodoResponse, TodoPresenterFactory } from "../presenter";

export type Mutations = {
  createTodo: { request: CreateTodoRequest; response: CreateTodoResponse };
};
export type Queries = {};


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

export type TodoRoutes<TodoRef> = ReturnType<typeof todoRoutes<TodoRef>>;