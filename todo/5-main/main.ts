import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { makeRouter } from "../../utils/network";
import { API } from "../4-network/shared/config";
import cors from 'cors';
import { Todo } from "../1-entities";
import { TodoInteractorFactory, TodoRepository } from "../2-interactor";
import { CreateTodoInteractorImpl } from "../2-interactor/impl";
import { Encoder } from "../3-presenter";
import { ServerTodoPresenter } from "../3-presenter/impl";

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

const todoPresenter = new ServerTodoPresenter<IdRef>(refEncoder);

const routes = todoRoutes(new TodoService(todoFactory), todoPresenter);
const router = makeRouter(routes);
export type AppRouter = typeof router;
const { host, port } = API;
const HOST = `http://${host}:${port}`;
createHTTPServer({ middleware: cors(), router }).listen({ host, port }, () => {
  console.log(`Server is running on ${HOST}`);
});
