import { initTRPC } from '@trpc/server'
import { MRoute, MRoutes, Route, RoutesDom } from './route'

const mapObject = <T extends object, V extends Record<keyof T, unknown>>(obj: T, map: <K extends keyof T>(v: T[K], x: K) => V[K]) => Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, map(v, k as keyof T)])) as Pick<V, string & keyof T>
export const makeRouter = <M extends RoutesDom<M>, Q extends RoutesDom<Q>>(r: MRoutes<M, Q>) => {
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
    [K in keyof MRoute<M>]: MRoute<M>[K] extends Route<infer Req, infer Res> ? MutationProcedure<Req, Res> : never
  }
  type QueryProcedures = {
    [K in keyof MRoute<Q>]: MRoute<Q>[K] extends Route<infer Req, infer Res> ? QueryProcedure<Req, Res> : never
  }
  const routes = {
    ...mapObject<MRoute<M>, MutationProcedures>(r.mutations, (route, k) => {
      type R = typeof route
      type Res = R extends Route<infer _, infer Res> ? Res : never
      type Req = R extends Route<infer Req, infer _> ? Req : never
      return mapMutationToProcedure(route as Route<Req, Res>) as MutationProcedures[typeof k]
    }),
    ...mapObject<MRoute<Q>, QueryProcedures>(r.queries, (route, k) => {
      type R = typeof route
      type Res = R extends Route<infer _, infer Res> ? Res : never
      type Req = R extends Route<infer Req, infer _> ? Req : never
      return mapQueryToProcedure(route as Route<Req, Res>) as QueryProcedures[typeof k]
    })
  }
  return t.router(routes)
}

