import { createHTTPServer } from "@trpc/server/adapters/standalone";
import cors from 'cors';
import { makeRouter } from "../../utils/network";
import { API } from "./config";
import { Encoder, ServerTodoController, ServerTodoPresenter, ServerTodoPresenterFactory, TodoInteractorFactoryImpl, todoInMemoryRepository, todoRoutes } from './server.deps';
import { TodoOps } from "../1-entities";

export type IdRef = { id: string };
const refEncoder: Encoder<IdRef> = {
  decode: (id) => ({ id }),
  encode: ({ id }) => id,
};
type Todo = {
  label: string;
  completed: boolean;
}

const ops: TodoOps<Todo> = {
  getTitle: (todo) => todo.label,
  isCompleted: (todo) => todo.completed,
  toggle: (todo) => ({ ...todo, completed: !todo.completed }),
  create: (label, completed) => ({ label, completed }),
}

const todoRepository = todoInMemoryRepository<Todo, IdRef>(() => ({ id: Math.random().toString(36).substring(2, 15) }));
const todoFactory = new TodoInteractorFactoryImpl(todoRepository, ops)
const todoPresenter: ServerTodoPresenterFactory<Todo, IdRef> = new ServerTodoPresenter<Todo, IdRef>(refEncoder, ops);

const routes = todoRoutes(new ServerTodoController(todoFactory), todoPresenter);
const router = makeRouter(routes);
export type AppRouter = typeof router;
const { host, port } = API;
const HOST = `http://${host}:${port}`;
createHTTPServer({ middleware: cors(), router }).listen({ host, port }, () => {
  console.log(`Server is running on ${HOST}`);
});
