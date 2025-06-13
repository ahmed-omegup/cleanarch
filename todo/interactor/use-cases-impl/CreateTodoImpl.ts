import { Todo, TodoRepository } from "../../todo";
import { CreateTodoInteractor, CreateTodoInput, CreateTodoPresenter } from "../use-cases/CreateTodo";

export class CreateTodoInteractorImpl<TodoRef> implements CreateTodoInteractor {
    constructor(private todoRepository: TodoRepository<TodoRef>, private presenter: CreateTodoPresenter<TodoRef>) { }

    async execute(input: CreateTodoInput) {
        if (!input.label.trim()) {
            return { success: false, error: 'EmptyLabel' };
        }

        const todo = new Todo(input.label, false);
        const ref = await this.todoRepository.save({ label: todo.title, completed: todo.completed });
        this.presenter.render({ success: true, todo, ref });
    }
}