import { TodoDom } from "../deps";
import { CreateTodoInteractorInput, CreateTodoInteractorOutput } from "./CreateTodo";
import { ListTodoInteractorInput, ListTodoInteractorOutput } from "./ListTodo";


export interface TodoInteractorFactory<TodoEntity extends TodoDom['Entity'], Error> {
    createTodo(actors: { presenter: CreateTodoInteractorOutput<TodoEntity, Error> }): CreateTodoInteractorInput
    listTodo(actors: { presenter: ListTodoInteractorOutput<TodoEntity, Error> }): ListTodoInteractorInput
}

