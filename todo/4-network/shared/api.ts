import { makeRouter } from "../../../utils/network";
import { Mutations, Queries } from "./routes";

export type AppRouter = ReturnType<typeof makeRouter<Mutations, Queries>>;
