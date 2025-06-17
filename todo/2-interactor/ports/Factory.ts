import { TodoDom } from "../deps";
import { CreateTodoInteractorInput, CreateTodoInteractorOutput } from "./CreateTodo";
import { ListTodoInteractorInput, ListTodoInteractorOutput } from "./ListTodo";
import { ToggleTodoInteractorInput, ToggleTodoInteractorOutput } from "./ToggleTodo";


export interface TodoInteractorFactory<TodoEntity extends TodoDom['Entity'], TodoRef extends TodoDom['Ref'], Error> {
    createTodo(actors: { presenter: CreateTodoInteractorOutput<TodoEntity, Error> }): CreateTodoInteractorInput
    listTodo(actors: { presenter: ListTodoInteractorOutput<TodoEntity, Error> }): ListTodoInteractorInput
    toggleTodo(actors: { presenter: ToggleTodoInteractorOutput<Error> }): ToggleTodoInteractorInput<TodoRef>
}

