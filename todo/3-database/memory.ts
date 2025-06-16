import { TodoRepository } from "./deps";



export const todoInMemoryRepository = <Todo, TodoRef>(generator: () => TodoRef): TodoRepository<Todo, TodoRef> => {
  const todos = new Map<TodoRef, Todo>();
  return {
    save: async todo => {
      const id = generator();
      todos.set(id, todo);
      return id;
    },
    get: async (ref) => {
      return todos.get(ref) ?? null;
    },
    list: async () => {
      return Array.from(todos.entries()).map(([ref, todo]) => ({ todo, ref }));
    }
  };
}