import { TodoDom } from "../deps";

export interface TodoRepository<Todo extends TodoDom> {
  save(todo: Todo['Model']): Promise<Todo['Entity']>;
  get(ref: Todo['Ref']): Promise<Todo['Entity'] | null>;
  list(): Promise<Todo['Entity'][]>;
}
