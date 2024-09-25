import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { TodosApiService } from "../todos-api.service";
import { TodosCardComponent } from "./todos-card/todos-card.component";
import { AsyncPipe, NgFor } from "@angular/common";
import { TodosService } from "../todos.service";

export interface ITodo {
	userId: number,
	id: number,
	title: string,
	completed: boolean,
}

@Component({
	selector: 'app-todos-list',
	standalone: true,
	imports: [TodosCardComponent, NgFor, AsyncPipe],
	templateUrl: './todos-list.component.html', 
	styleUrl: './todos-list.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
}) 

export class TodosListComponent {
	readonly todosApiService = inject(TodosApiService)

	readonly todoService = inject(TodosService);

	constructor() {
		this.todosApiService.getTodos().subscribe((response: any) => {
			this.todoService.setTodo(response);
		})
	}

	deleteTodo(id: number) {
		this.todoService.deleteTodo(id);
	}
}