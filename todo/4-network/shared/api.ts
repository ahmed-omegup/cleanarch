import { makeRouter } from "../../../utils/network";
import { Mutations, Queries } from "./routes";

export type AppRouter<Error> = ReturnType<typeof makeRouter<Mutations<Error>, Queries<Error>>>;
