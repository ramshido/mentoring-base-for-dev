import { Component, inject } from "@angular/core";
import { TodosApiService } from "../todos-api.service";
import { TodosCardComponent } from "./todos-card/todos-card.component";
import { NgFor } from "@angular/common";

export interface ITodo {
	userId: number,
	id: number,
	title: string,
	completed: boolean,
}

@Component({
	selector: 'app-todos-list',
	standalone: true,
	imports: [TodosCardComponent, NgFor],
	templateUrl: './todos-list.component.html', 
	styleUrl: './todos-list.component.scss',
}) 

export class TodosListComponent {
	readonly todosApiService = inject(TodosApiService)
	todos: ITodo[] = [];

	constructor() {
		this.todosApiService.getTodos().subscribe((response: any) => {
			this.todos = response;
		})
	}

	deleteTodo(id: number) {
		this.todos = this.todos.filter(item => item.id !== id)
	}
}