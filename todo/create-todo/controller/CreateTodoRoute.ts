import { z } from 'zod'
import { createRoute } from '../../network/server/schema'
import { CreateTodoController, CreateTodoRequest, CreateTodoResponse } from './CreateTodoController'

export const createTodoRoute = <TodoRef>(exec: CreateTodoController<TodoRef>) => createRoute<CreateTodoRequest, CreateTodoResponse<TodoRef>>({
    request: z.object({ label: z.string() }),
    exec,
})
