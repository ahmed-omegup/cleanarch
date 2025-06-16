import { z } from "zod";
import { createRoute, MRoutes } from "../../../utils/route";
import { CreateTodoRequest, CreateTodoResponse, ListTodoRequest, ListTodoResponse, ServerTodoPresenterFactory, TodoDom, TodoServerControllerFactory } from "../deps";

export type Mutations = {
  createTodo: { request: CreateTodoRequest; response: CreateTodoResponse };
};
export type Queries = {
  listTodo: { request: ListTodoRequest; response: ListTodoResponse };
};


type Routes = MRoutes<Mutations, Queries>

export const todoRoutes = <TodoEntity  extends TodoDom['Entity']>(controller: TodoServerControllerFactory<TodoEntity>, presenter: ServerTodoPresenterFactory<TodoEntity>): Routes => ({
  mutations: {
    createTodo: createRoute<CreateTodoRequest, CreateTodoResponse>({
      request: z.object({ label: z.string() }),
      exec: { handle: (input) => new Promise<CreateTodoResponse>(resolve => controller.createTodo(presenter.createTodo({ render: resolve })).run(input)) },
    }),
  },
  queries: {
    listTodo: createRoute<ListTodoRequest, ListTodoResponse>({
      request: z.object({}),
      exec: { handle: (input) => new Promise<ListTodoResponse>(resolve => controller.listTodo(presenter.listTodo({ render: resolve })).run(input)) },
    }),
  },
});

export type TodoRoutes<TodoEntity extends TodoDom['Entity']> = ReturnType<typeof todoRoutes<TodoEntity>>;