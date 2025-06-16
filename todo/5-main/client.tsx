import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { createRoot } from "react-dom/client";
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
  toggle: (todo) => ({ ...todo, completed: !todo.completed }),
  create: (label, completed) => ({ label, completed }),
  entity: ({ _brand, ...todo }, ref) => ({ id: ref, ...todo }),
  model: ({ _brand, ...todo }) => todo,
  ref: (todo) => todo.id,
}

const id = <T,>(x: T) => x
const refEncoder: Encoder<string> = {
  decode: id,
  encode: id,
};
const remoteInteractorFactory = new RemoteTodoInteractorFactory<Todo['Entity'], 'NetworkError' | ServerError>(todoClient({
  createTodo: (todo) => client.createTodo.mutate(todo),
  listTodo: (query) => client.listTodo.query(query),
}))

const presenterFactory = new TodoPresenter<Todo, 'NetworkError' | ServerError>(refEncoder, ops, (e) => ({ 
  UnknownError: 'Unknown Error', 
  NetworkError: 'Verify your network connection'
}[e]));
const controller = new TodoController(remoteInteractorFactory)

const TodoApp = TodoAppHoc({
  createTodo: (view) => controller.createTodo(presenterFactory.createTodo(view)),
  listTodo: (view) => controller.listTodo(presenterFactory.listTodo(view)),
});

createRoot(document.getElementById("app-root")!).render(<TodoApp />);
