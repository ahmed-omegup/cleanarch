import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { createRoot } from "react-dom/client";
import { TodoController } from "../3-controller/impl";
import { Encoder } from "../3-presenter";
import { TodoPresenter } from "../3-presenter/impl";
import { RemoteTodoInteractorFactory } from "../3-remote/impl";
import { todoClient } from "../4-network/client";
import { TodoApp as TodoAppHoc } from "../4-view";
import { API } from "./config";
import { AppRouter } from "./server";
import { TodoOps } from "../1-entities";

const { host, port } = API;
const HOST = `http://${host}:${port}`;

const client = createTRPCClient<AppRouter>({ links: [httpBatchLink({ url: HOST, })] });

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

const id = <T,>(x: T) => x
const refEncoder: Encoder<string> = {
  decode: id,
  encode: id,
};
const proxy = new RemoteTodoInteractorFactory(todoClient(refEncoder, {
  createTodo: (todo) => client.createTodo.mutate(todo),
  listTodo: (query) => client.listTodo.query(query),
}, ops))

const presenterFactory = new TodoPresenter<Todo, string>(refEncoder, ops)
const controller = new TodoController(proxy)

const TodoApp = TodoAppHoc({
  createTodo: (view) => controller.createTodo(presenterFactory.createTodo(view)),
  listTodo: (view) => controller.listTodo(presenterFactory.listTodo(view)),
});

createRoot(document.getElementById("app-root")!).render(<TodoApp />);
