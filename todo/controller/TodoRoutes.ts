import { z } from 'zod'
import { createRoute, Route } from '../network/server/schema'
import { TodoController, CreateTodoRequest, CreateTodoResponse } from './TodoController'

type Mutations<TodoRef> = {
  createTodo: Route<CreateTodoRequest, CreateTodoResponse<TodoRef>>
}
type Queries<TodoRef> = {
}

type Routes<TodoRef> = {
  mutations: Mutations<TodoRef>,
  queries: Queries<TodoRef>
}

export const todoRoutes = <TodoRef>(controller: TodoController<TodoRef>): Routes<TodoRef> => ({
  mutations: {
    createTodo: createRoute<CreateTodoRequest, CreateTodoResponse<TodoRef>>({
      request: z.object({ label: z.string() }),
      exec: { handle: input => controller.createTodo(input), },
    })
  },
  queries: {

  }
})
