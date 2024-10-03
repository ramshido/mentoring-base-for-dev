import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { TodosApiService } from "../todos-api.service";
import { TodosCardComponent } from "./todos-card/todos-card.component";
import { AsyncPipe, NgFor } from "@angular/common";
import { TodosService } from "../todos.service";
import { CreateTodoFormComponent } from "../create-todo-form/create-todo-form.component";
import { ICreateTodo } from "../Interfaces/ITodoInterface";

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
		this.todosApiService.getTodos().subscribe((response: any) => {
			this.todoService.setTodo(response);
		})
	};

	public deleteTodo(id: number) {
		this.todoService.deleteTodo(id);
	};

	public createTodo(todo: ICreateTodo) {
		this.todoService.createTodo({
			userId: todo.userId,
			id: new Date().getTime(),
			title: todo.title,
			completed: todo.completed,
		});
	};
}