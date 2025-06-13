import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { Encoder, TodoService } from "../../controller/TodoService";
import { TodoInteractorFactory } from "../../interactor";
import { CreateTodoInteractorImpl } from "../../interactor/use-cases-impl";
import { todoRoutes } from "../../controller/TodoRoutes";
import { Todo, TodoRepository } from "../../todo";
import { makeRouter } from "../../../utils/network";
import { API } from "../shared/config";
import cors from 'cors';

export type IdRef = { id: string };

const todos = new Map<string, Todo>();

const todoRepository: TodoRepository<IdRef> = {
  save: async (todo) => {
    const id = Math.random().toString(36).substring(2, 15);
    todos.set(id, todo);
    return { id };
  },
  get: async (ref) => {
    return todos.get(ref.id) ?? null;
  },
};

const todoFactory: TodoInteractorFactory<IdRef> = {
  createTodo: {
    make: ({ presenter }) =>
      new CreateTodoInteractorImpl(todoRepository, presenter),
  },
};
const refEncoder: Encoder<IdRef> = {
  decode: (id) => ({ id }),
  encode: ({ id }) => id,
};
const createTodo = todoRoutes(new TodoService(todoFactory, refEncoder));
const router = makeRouter(createTodo);
export type AppRouter = typeof router;
const { host, port } = API;
const HOST = `http://${host}:${port}`;
createHTTPServer({   middleware: cors(),router }).listen({ host, port }, () => {
  console.log(`Server is running on ${HOST}`);
});
