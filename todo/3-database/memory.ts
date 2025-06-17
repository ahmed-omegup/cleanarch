import { TodoDom, TodoLogicDom, TodoRepository } from "./deps";



export const todoInMemoryRepository = <Todo extends TodoDom['Model'], TodoRef extends TodoDom['Ref']>(generator: () => TodoRef): TodoRepository<{
  Ref: TodoRef,
  Model: Todo,
  Entity: TodoDom['Entity'] & [TodoRef, Todo],
  Patch: TodoLogicDom['Patch'] & Partial<Todo>
}> => {
  const todos = new Map<TodoRef, Todo>();
  return {
    save: async todo => {
      if(Math.random() < 0.2) throw new Error("DBError"); // Simulate db error
      const id = generator();
      todos.set(id, todo);
      return [id, todo];
    },
    get: async (ref) => {
      if(Math.random() < 0.2) throw new Error("DBError"); // Simulate db error
      const todo = todos.get(ref);
      return todo ? [ref, todo] : null;
    },
    list: async () => {
      if(Math.random() < 0.2) throw new Error("DBError"); // Simulate db error
      return Array.from(todos.entries());
    },
    patch: async (ref, patch) => {
      if(Math.random() < 0.2) throw new Error("DBError"); // Simulate db error
      const todo = todos.get(ref);
      if (!todo) return;
      const updatedTodo = { ...todo, ...patch };
      todos.set(ref, updatedTodo);
    }
  };
}