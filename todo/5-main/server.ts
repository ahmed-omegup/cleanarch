import { createHTTPServer } from "@trpc/server/adapters/standalone";
import cors from 'cors';
import { makeRouter } from "../../utils/network";
import { API, ServerError } from "./config";
import {  Encoder, ServerTodoController, ServerTodoPresenter, TodoInteractorFactoryImpl, todoInMemoryRepository, todoRoutes, AppRouter, Todo, ops } from './server.deps';


const id = <T,>(x: T) => x;
const refEncoder: Encoder<string> = {
  decode: id,
  encode: id,
};


const todoRepository = todoInMemoryRepository<Todo['Model'], Todo['Ref']>(() => Math.random().toString(36).substring(2, 15));
const todoFactory = new TodoInteractorFactoryImpl(todoRepository, ops)
const todoPresenter = new ServerTodoPresenter<Todo, 'UnknownError', 'StoringError'>(refEncoder, ops, () => 'UnknownError');

const routes = todoRoutes(new ServerTodoController<Todo['Entity'], Todo['Ref'], 'StoringError'>(todoFactory, id), todoPresenter);
const router: AppRouter<ServerError> = makeRouter(routes);

const { host, port } = API;
const HOST = `http://${host}:${port}`;
createHTTPServer({ middleware: cors(), router }).listen({ host, port }, () => {
  console.log(`Server is running on ${HOST}`);
});
