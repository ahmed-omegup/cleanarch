import { TodoDom, TodoOps, TodoRepository } from "./deps";



export const todoInMemoryRepository = <Todo extends TodoDom>(ops:TodoOps<Todo>, generator: () => Todo['Ref']): TodoRepository<Todo> => {
  const todos = new Map<Todo['Ref'], Todo['Entity']>();
  return {
    save: async todo => {
      if(Math.random() < 0.5) throw new Error("DBError"); // Simulate db error
      const id = generator();
      const entity = ops.entity(todo, id);
      todos.set(id, entity);
      return entity;
    },
    get: async (ref) => {
      if(Math.random() < 0.5) throw new Error("DBError"); // Simulate db error
      return todos.get(ref) ?? null;
    },
    list: async () => {
      if(Math.random() < 0.5) throw new Error("DBError"); // Simulate db error
      return Array.from(todos.values());
    }
  };
}