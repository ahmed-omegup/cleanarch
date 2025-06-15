import { CreateTodoInteractorInput, CreateTodoInteractorOutput } from "./CreateTodo";
import { ListTodoInteractorInput, ListTodoInteractorOutput } from "./ListTodo";


export interface TodoInteractorFactory<TodoRef> {
    createTodo(actors: { presenter: CreateTodoInteractorOutput<TodoRef> }): CreateTodoInteractorInput
    listTodo(actors: { presenter: ListTodoInteractorOutput<TodoRef> }): ListTodoInteractorInput
}

