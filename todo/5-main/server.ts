import { createHTTPServer } from "@trpc/server/adapters/standalone";
import cors from 'cors';
import { makeRouter } from "../../utils/network";
import { TodoInteractorFactoryImpl } from "../2-interactor/impl";
import { TodoControllerFactory } from "../3-controller";
import { TodoController } from "../3-controller/impl";
import { todoInMemoryRepository } from "../3-database/memory";
import { Encoder } from "../3-presenter";
import { ServerTodoPresenterFactory } from "../3-presenter-server";
import { ServerTodoPresenter } from "../3-presenter-server/impl";
import { todoRoutes } from "../4-network/shared";
import { API } from "./config";

export type IdRef = { id: string };
const refEncoder: Encoder<IdRef> = {
  decode: (id) => ({ id }),
  encode: ({ id }) => id,
};

const todoRepository = todoInMemoryRepository<IdRef>(() => ({ id: Math.random().toString(36).substring(2, 15) }));
const todoFactory = new TodoInteractorFactoryImpl(todoRepository)


const todoPresenter: ServerTodoPresenterFactory<IdRef> = new ServerTodoPresenter<IdRef>(refEncoder);

const scc: TodoControllerFactory<IdRef> = new TodoController(todoFactory)

const routes = todoRoutes(scc, todoPresenter);
const router = makeRouter(routes);
export type AppRouter = typeof router;
const { host, port } = API;
const HOST = `http://${host}:${port}`;
createHTTPServer({ middleware: cors(), router }).listen({ host, port }, () => {
  console.log(`Server is running on ${HOST}`);
});
