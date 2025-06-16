import { z } from "zod";
import { createRoute, MRoutes } from "../../../utils/route";
import { CreateTodoRequest, CreateTodoResponse, ListTodoRequest, ListTodoResponse, ServerTodoPresenterFactory, TodoServerControllerFactory } from "../deps";

export type Mutations = {
  createTodo: { request: CreateTodoRequest; response: CreateTodoResponse };
};
export type Queries = {
  listTodo: { request: ListTodoRequest; response: ListTodoResponse };
};


type Routes = MRoutes<Mutations, Queries>

export const todoRoutes = <Todo, TodoRef>(controller: TodoServerControllerFactory<Todo, TodoRef>, presenter: ServerTodoPresenterFactory<Todo, TodoRef>): Routes => ({
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

export type TodoRoutes<Todo, TodoRef> = ReturnType<typeof todoRoutes<Todo, TodoRef>>;