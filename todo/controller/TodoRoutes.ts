import { z } from 'zod'
import { createRoute } from '../network/server/schema'
import { TodoController, CreateTodoRequest, CreateTodoResponse } from './TodoController'

export const todoRoutes = <TodoRef>(controller: TodoController<TodoRef>) => ({
  mutations: {
    createTodo: createRoute<CreateTodoRequest, CreateTodoResponse<TodoRef>>({
      request: z.object({ label: z.string() }),
      exec: { handle: input => controller.createTodo(input), },
    })
  },
  queries: {

  }
})
