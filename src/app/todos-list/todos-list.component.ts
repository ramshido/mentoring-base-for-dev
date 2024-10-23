import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { TodosApiService } from "../services/todos-api.service";
import { TodosCardComponent } from "./todos-card/todos-card.component";
import { AsyncPipe, NgFor } from "@angular/common";
import { TodosService } from "../services/todos.service";
import { ITodo } from "../interfaces/todo.interface";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { CreateTodoDialogComponent } from "./create-todo-dialog/create-todo-dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
	selector: 'app-todos-list',
	standalone: true,
	imports: [
		TodosCardComponent, 
		NgFor, 
		AsyncPipe, 
		MatButtonModule,
		MatIconModule,
	],
	templateUrl: './todos-list.component.html',
	styleUrl: './todos-list.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosListComponent {
	private readonly todosApiService = inject(TodosApiService);
	public readonly todoService = inject(TodosService);
	private readonly dialog = inject(MatDialog);

	constructor() {
		this.todosApiService.getTodos().subscribe((response: ITodo[]) => {
			this.todoService.setTodo(response.slice(1, 11));
		});
	};

	public deleteTodo(id: number): void {
		this.todoService.deleteTodo(id);
	};

	public createTodo(todo: ITodo): void {
		this.todoService.createTodo(todo);
	};

	public openDialog(): void {
		const dialogRef = this.dialog.open(CreateTodoDialogComponent, {
			width: '600px',
		});

		const dialogComponentInstance = dialogRef.componentInstance;

		dialogComponentInstance.dataSubject.subscribe((data: ITodo) => {
			if (data) {
				this.createTodo(data);
			};
		});
		
	}
}