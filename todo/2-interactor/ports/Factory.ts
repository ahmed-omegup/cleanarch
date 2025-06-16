import { TodoDom } from "../deps";
import { CreateTodoInteractorInput, CreateTodoInteractorOutput } from "./CreateTodo";
import { ListTodoInteractorInput, ListTodoInteractorOutput } from "./ListTodo";


export interface TodoInteractorFactory<TodoEntity extends TodoDom['Entity']> {
    createTodo(actors: { presenter: CreateTodoInteractorOutput<TodoEntity> }): CreateTodoInteractorInput
    listTodo(actors: { presenter: ListTodoInteractorOutput<TodoEntity> }): ListTodoInteractorInput
}

