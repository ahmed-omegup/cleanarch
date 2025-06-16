import { CreateTodoInteractorInput, CreateTodoInteractorOutput } from "./CreateTodo";
import { ListTodoInteractorInput, ListTodoInteractorOutput } from "./ListTodo";


export interface TodoInteractorFactory<Todo, TodoRef> {
    createTodo(actors: { presenter: CreateTodoInteractorOutput<Todo, TodoRef> }): CreateTodoInteractorInput
    listTodo(actors: { presenter: ListTodoInteractorOutput<Todo, TodoRef> }): ListTodoInteractorInput
}

