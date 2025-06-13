import { CreateTodoFactory } from "./use-cases/CreateTodo";


export interface TodoInteractorFactory<TodoRef> {
    createTodo: CreateTodoFactory<TodoRef>
}

