import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { API, ServerError } from "./config";
import { Encoder, RemoteTodoInteractorFactory, TodoAppHoc, TodoController, TodoPresenter, todoClient, TodoOps, TodoDom, TodoDTO, AppRouter } from './client.deps'

const { host, port } = API;
const HOST = `http://${host}:${port}`;

const client = createTRPCClient<AppRouter<ServerError>>({ links: [httpBatchLink({ url: HOST, })] });

type Todo = TodoDom & {
  Ref: string;
  Entity: TodoDTO;
  Model: {
    label: string;
    completed: boolean;
  };
};


const ops: TodoOps<Todo> = {
  getTitle: (todo) => todo.label,
  isCompleted: (todo) => todo.completed,
  model: ({ _brand, ...todo }) => todo,
  ref: (todo) => todo.id,
}

const id = <T,>(x: T) => x
const refEncoder: Encoder<string> = {
  decode: id,
  encode: id,
};
const remoteInteractorFactory = new RemoteTodoInteractorFactory<Todo['Entity'], Todo['Ref'], 'NetworkError' | ServerError>(todoClient({
  createTodo: (todo) => client.createTodo.mutate(todo),
  listTodo: (query) => client.listTodo.query(query),
  toggleTodo: (query) => client.toggleTodo.mutate(query),
}))

const presenterFactory = new TodoPresenter<Todo, 'NetworkError' | ServerError>(refEncoder, ops, (e) => ({
  UnknownError: 'Unknown Error',
  NetworkError: 'Verify your network connection'
}[e]));
const controller = new TodoController<Todo['Entity'], Todo['Ref'], 'NetworkError' | ServerError>(remoteInteractorFactory, x => x)

export const TodoApp = TodoAppHoc({
  createTodo: (view) => controller.createTodo(presenterFactory.createTodo(view)),
  listTodo: (view) => controller.listTodo(presenterFactory.listTodo(view)),
  toggleTodo: (view) => controller.toggleTodo(presenterFactory.toggleTodo(view)),
});

