import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { CreateTodoService } from "../../create-todo/controller/CreateTodoService";
import { CreateTodoFactory } from "../../create-todo/interactor";
import { CreateTodoInteractor } from "../../create-todo/interactor/CreateTodoInteractor";
import { createTodoRoute } from "../../create-todo/controller/CreateTodoRoute";
import { TodoRaw, TodoRepository } from "../../todo";
import { makeRouter } from "./server";
import { API } from "../shared/config";

export type IdRef = { id: string };

const todos = new Map<string, TodoRaw>();

const todoRepository: TodoRepository<IdRef> = {
    save: async (todo) => {
        const id = Math.random().toString(36).substring(2, 15);
        todos.set(id, todo);
        return { id };
    },
    get: async (ref) => {
        return todos.get(ref.id) ?? null;
    }
}

const createTodoFactory: CreateTodoFactory<IdRef> = {
    create: ({ presenter }) => new CreateTodoInteractor(todoRepository, presenter)
}
const createTodo = createTodoRoute(new CreateTodoService(createTodoFactory))
const router = makeRouter({ createTodo }, {})
export type AppRouter = typeof router;
const { host, port } = API;
const HOST = `http://${host}:${port}`;
createHTTPServer({ router }).listen({ host, port }, () => {
    console.log(`Server is running on ${HOST}`);
});