import { createRoot } from "react-dom/client";
import { TodoApp as TodoAppHoc } from "./TodoApp";
import { todoClient } from "../network/client/TodoClient";
import { Encoder, TodoPresenterImpl } from "../presenter/TodoPresenterImpl";
import { IdRef } from "../network/server/main";

const refEncoder: Encoder<IdRef> = {
  decode: (id) => ({ id }),
  encode: ({ id }) => id,
};

const TodoApp = TodoAppHoc({
  createTodo: (view) => {
    return {
      run: async (input) => {
        const ctr = todoClient(refEncoder)
        const presenterFactory = new TodoPresenterImpl<IdRef>(refEncoder)
        const presenter = presenterFactory.createTodo(view)
        ctr.createTodo({ render: model => presenter.render(model) }).run(input)
      },
    };
  },
});

createRoot(document.getElementById("app-root")!).render(<TodoApp />);
