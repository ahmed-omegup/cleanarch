import { TodoLogic, TodoLogicDom } from "./ports";

export type TodoModel = {
  label: string;
  completed: boolean;
}
export type Todo = TodoLogicDom & {
  Ref: string;
  Entity: [string, TodoModel];
  Model: TodoModel;
  Patch: Partial<TodoModel>;
};

export const ops: TodoLogic<Todo> = {
  getTitle: (todo) => todo.label,
  isCompleted: (todo) => todo.completed,
  create: (label, completed) => ({ label, completed }),
  model: ([, todo]) => todo,
  ref: ([ref]) => ref,
  toggle: ([_, todo]) => ({ completed: !todo.completed }),
  patch: (model, {_brand, ...patch}) => ({ ...model, ...patch }),
}
