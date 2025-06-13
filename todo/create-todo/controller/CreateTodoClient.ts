import { client } from "../../network/client/remote";
import { IdRef } from "../../network/server/main";
import { CreateTodoController } from "./CreateTodoController";

export const createTodoClient: CreateTodoController<IdRef> = {
    handle: (input) => client.createTodo.mutate(input).catch((error) => {
        console.error("Error creating todo:", error);
        return { success: false, error: 'UnknownError' };
    })
}