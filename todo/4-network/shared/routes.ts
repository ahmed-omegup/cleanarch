import { z } from "zod";
import { createRoute, MRoutes } from "../../../utils/route";
import { CreateTodoRequest, CreateTodoResponse, ListTodoRequest, ListTodoResponse, ServerTodoPresenterFactory, TodoDom, TodoServerControllerFactory, ToggleTodoResponse, ToggleTodoRequest } from "../deps";

export type Mutations<Error> = {
  createTodo: { request: CreateTodoRequest; response: CreateTodoResponse<Error> };
  toggleTodo: { request: ToggleTodoRequest; response: ToggleTodoResponse<Error> };
};
export type Queries<Error> = {
  listTodo: { request: ListTodoRequest; response: ListTodoResponse<Error> };
};


type Routes<Error> = MRoutes<Mutations<Error>, Queries<Error>>

export const todoRoutes = <TodoEntity extends TodoDom['Entity'], InnerError, ServerError>(
  controller: TodoServerControllerFactory<TodoEntity, InnerError>,
  presenter: ServerTodoPresenterFactory<TodoEntity, ServerError, InnerError>
): Routes<ServerError> => ({
  mutations: {
    createTodo: createRoute<CreateTodoRequest, CreateTodoResponse<ServerError>>({
      request: z.object({ label: z.string() }),
      exec: { handle: (input) => new Promise(resolve => controller.createTodo(presenter.createTodo({ render: resolve })).run(input)) },
    }),
    toggleTodo: createRoute<ToggleTodoRequest, ToggleTodoResponse<ServerError>>({
      request: z.object({ ref: z.string() }),
      exec: { handle: (input) => new Promise(resolve => controller.toggleTodo(presenter.toggleTodo({ render: resolve })).run(input)) },
    }),
  },
  queries: {
    listTodo: createRoute<ListTodoRequest, ListTodoResponse<ServerError>>({
      request: z.object({}),
      exec: { handle: (input) => new Promise(resolve => controller.listTodo(presenter.listTodo({ render: resolve })).run(input)) },
    }),
  },
});

export type TodoRoutes<TodoEntity extends TodoDom['Entity'], InnerError, ServerError> = ReturnType<typeof todoRoutes<TodoEntity, InnerError, ServerError>>;