import { TodoLogicDom } from "../deps";

export interface TodoRepository<Todo extends TodoLogicDom> {
  save(todo: Todo['Model']): Promise<Todo['Entity']>;
  get(ref: Todo['Ref']): Promise<Todo['Entity'] | null>;
  list(): Promise<Todo['Entity'][]>;
  patch(ref: Todo['Ref'], patch: Todo['Patch']): Promise<void>;
}
