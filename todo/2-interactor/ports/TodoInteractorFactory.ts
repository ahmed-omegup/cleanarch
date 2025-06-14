import { CreateTodoFactory } from "./CreateTodo";


export interface TodoInteractorFactory<TodoRef> {
    createTodo: CreateTodoFactory<TodoRef>
}

