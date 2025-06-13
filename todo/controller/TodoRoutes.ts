import { z } from "zod";
import { createRoute, MRoutes, Route } from "../../utils/route";
import {
  TodoController,
  CreateTodoRequest,
  CreateTodoResponse,
} from "./TodoController";

type Mutations = {
  createTodo: { request: CreateTodoRequest; response: CreateTodoResponse };
};
type Queries = {};


type Routes = MRoutes<Mutations, Queries>

export const todoRoutes = (controller: TodoController): Routes => ({
  mutations: {
    createTodo: createRoute<CreateTodoRequest, CreateTodoResponse>({
      request: z.object({ label: z.string() }),
      exec: { handle: (input) => controller.createTodo(input) },
    }),
  },
  queries: {},
});
