export type TodoDom = {
  Model: { _brand?: 'TodoModel' };
  Entity: { _brand?: 'TodoEntity' };
  Ref: { _brand?: 'TodoRef' };
}


export type TodoOps<Todo extends TodoDom> = {
  model(t: Todo['Entity']): Todo['Model'];
  ref(t: Todo['Entity']): Todo['Ref'];
  isCompleted(t: Todo['Model']): boolean;
  getTitle: (t: Todo['Model']) => string;
}

export type TodoLogicDom = TodoDom & {
  Patch: { _brand?: 'TodoPatch' };
}

export type TodoLogic<Todo extends TodoLogicDom> = TodoOps<Todo> & {
  create(title: string, completed: boolean): Todo['Model'];
  toggle(t: Todo['Entity']): Todo['Patch'];
  patch(m: Todo['Model'], t: Todo['Patch']): Todo['Model'];
}