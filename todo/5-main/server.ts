import { createHTTPServer } from "@trpc/server/adapters/standalone";
import cors from 'cors';
import { makeRouter } from "../../utils/network";
import { API } from "./config";
import { Encoder, ServerTodoController, ServerTodoPresenter, ServerTodoPresenterFactory, TodoInteractorFactoryImpl, todoInMemoryRepository, todoRoutes } from './server.deps';
import { TodoDom, TodoOps } from "../1-entities";


const id = <T,>(x: T) => x;
const refEncoder: Encoder<string> = {
  decode: id,
  encode: id,
};

type TodoModel = {
  label: string;
  completed: boolean;
}
type Todo = TodoDom & {
  Ref: string;
  Entity: [string, TodoModel];
  Model: TodoModel;
};

const ops: TodoOps<Todo> = {
  getTitle: (todo) => todo.label,
  isCompleted: (todo) => todo.completed,
  toggle: (todo) => ({ ...todo, completed: !todo.completed }),
  create: (label, completed) => ({ label, completed }),
  entity: (todo, ref) => [ref, todo],
  model: ([, todo]) => todo,
  ref: ([ref]) => ref,
}

const todoRepository = todoInMemoryRepository<Todo>(ops, () =>  Math.random().toString(36).substring(2, 15) );
const todoFactory = new TodoInteractorFactoryImpl(todoRepository, ops)
const todoPresenter: ServerTodoPresenterFactory<Todo['Entity']> = new ServerTodoPresenter<Todo>(refEncoder, ops);

const routes = todoRoutes(new ServerTodoController(todoFactory), todoPresenter);
const router = makeRouter(routes);
export type AppRouter = typeof router;
const { host, port } = API;
const HOST = `http://${host}:${port}`;
createHTTPServer({ middleware: cors(), router }).listen({ host, port }, () => {
  console.log(`Server is running on ${HOST}`);
});
