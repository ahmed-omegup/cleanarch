import { initTRPC } from '@trpc/server'
import { CreateTodoRequest, CreateTodoResponse } from '../../create-todo/controller/CreateTodoController'
import { Route } from './schema'

type Mutations<Ref> = {
  createTodo: Route<CreateTodoRequest, CreateTodoResponse<Ref>>
}
type Queries<Ref> = {
}

const mapObject = <T extends object, V extends Record<keyof T, unknown>>(obj: T, map: <K extends keyof T>(v: T[K], x: K) => V[K]) => Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, map(v, k as keyof T)])) as Pick<V, string & keyof T>
export const makeRouter = <Ref>(mutaters: Mutations<Ref>, queries: Queries<Ref>) => {
  const t = initTRPC.create()
  const mapMutationToProcedure = <Req, Res>(route: Route<Req, Res>) => {
    return t.procedure.input(route.request).mutation(({ input }) => route.exec.handle(input as Req))
  }
  const mapQueryToProcedure = <Req, Res>(route: Route<Req, Res>) => {
    return t.procedure.input(route.request).query(({ input }) => route.exec.handle(input as Req))
  }
  type MutationProcedure<Req, Res> = ReturnType<typeof mapMutationToProcedure<Req, Res>>
  type QueryProcedure<Req, Res> = ReturnType<typeof mapQueryToProcedure<Req, Res>>
  type MutationProcedures = {
    [K in keyof Mutations<Ref>]: Mutations<Ref>[K] extends Route<infer Req, infer Res> ? MutationProcedure<Req, Res> : never
  }
  type QueryProcedures = {
    [K in keyof Queries<Ref>]: Queries<Ref>[K] extends Route<infer Req, infer Res> ? QueryProcedure<Req, Res> : never
  }
  const routes = {
    ...mapObject<Mutations<Ref>, MutationProcedures>(mutaters, (route, k) => {
      type R = typeof route
      type Res = R extends Route<infer _, infer Res> ? Res : never
      type Req = R extends Route<infer Req, infer _> ? Req : never
      return mapMutationToProcedure(route as Route<Req, Res>) as MutationProcedures[typeof k]
    }),
    ...mapObject<Queries<Ref>, QueryProcedures>(queries, (route, k) => {
      type R = typeof route
      type Res = R extends Route<infer _, infer Res> ? Res : never
      type Req = R extends Route<infer Req, infer _> ? Req : never
      return mapQueryToProcedure(route as Route<Req, Res>) as QueryProcedures[typeof k]
    })
  }
  return t.router(routes)
}

