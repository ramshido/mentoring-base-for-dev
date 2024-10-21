import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { TodosApiService } from "../services/todos-api.service";
import { TodosCardComponent } from "./todos-card/todos-card.component";
import { AsyncPipe, NgFor } from "@angular/common";
import { TodosService } from "../services/todos.service";
import { CreateTodoFormComponent } from "../create-todo-form/create-todo-form.component";
import { ITodo } from "../interfaces/todo.interface";

@Component({
	selector: 'app-todos-list',
	standalone: true,
	imports: [TodosCardComponent, NgFor, AsyncPipe, CreateTodoFormComponent],
	templateUrl: './todos-list.component.html',
	styleUrl: './todos-list.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosListComponent {
	private readonly todosApiService = inject(TodosApiService);

	public readonly todoService = inject(TodosService);

	constructor() {
		this.todosApiService.getTodos().subscribe((response: ITodo[]) => {
			this.todoService.setTodo(response.slice(1, 11));
		})
	};

	public deleteTodo(id: number) {
		this.todoService.deleteTodo(id);
	};

	public createTodo(todo: ITodo) {
		this.todoService.createTodo(todo);
	};
}