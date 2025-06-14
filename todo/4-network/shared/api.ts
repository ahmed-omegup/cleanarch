import { makeRouter } from "../../../utils/network";
import { Mutations, Queries } from "./TodoRoutes";

export type AppRouter = ReturnType<typeof makeRouter<Mutations, Queries>>;
