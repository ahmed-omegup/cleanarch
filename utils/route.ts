import type { ZodType, ZodTypeDef } from 'zod'

export const schema = <Type>() => <Def extends ZodTypeDef, Z extends ZodType<Type, Def, Type>>(input: Z) => input
export type Route<Request, Response> = {
    request: ZodType<Request, ZodTypeDef, Request>,
    exec: {
        handle(input: Request): Promise<Response>
    }
}
export const createRoute = <Request, Response>(handler: Route<Request, Response>) => handler

export type RoutesDom<T> = Record<keyof T, { request: unknown; response: unknown }>;

export type MRoute<T extends RoutesDom<T>> = {
  [K in keyof T]: Route<T[K]["request"], T[K]["response"]>;
};
export type MRoutes<M extends RoutesDom<M>, Q extends RoutesDom<Q>> = {
  mutations: MRoute<M>;
  queries: MRoute<Q>;
};
