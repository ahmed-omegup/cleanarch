export type TodoDom = {
  Model: {_brand?: 'TodoModel'};
  Entity: {_brand?: 'TodoEntity'};
  Ref: {_brand?: 'TodoRef'};
}


export type TodoOps<Todo extends TodoDom> = {
  model(t: Todo['Entity']): Todo['Model'];
  ref(t: Todo['Entity']): Todo['Ref'];
  entity(t: Todo['Model'], ref: Todo['Ref']): Todo['Entity'];
  create(title: string, completed: boolean): Todo['Model'];
  toggle(t: Todo['Model']): void;
  isCompleted(t: Todo['Model']): boolean;
  getTitle: (t: Todo['Model']) => string;
}