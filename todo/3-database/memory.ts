import { TodoDom, TodoOps, TodoRepository } from "./deps";



export const todoInMemoryRepository = <Todo extends TodoDom>(ops:TodoOps<Todo>, generator: () => Todo['Ref']): TodoRepository<Todo> => {
  const todos = new Map<Todo['Ref'], Todo['Entity']>();
  return {
    save: async todo => {
      const id = generator();
      const entity = ops.entity(todo, id);
      todos.set(id, entity);
      return entity;
    },
    get: async (ref) => {
      return todos.get(ref) ?? null;
    },
    list: async () => {
      return Array.from(todos.values());
    }
  };
}