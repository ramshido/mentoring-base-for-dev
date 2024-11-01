import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { TodosApiService } from "../services/todos-api.service";
import { TodosCardComponent } from "./todos-card/todos-card.component";
import { AsyncPipe, NgFor } from "@angular/common";
import { TodosService } from "../services/todos.service";
import { ITodo } from "../interfaces/todo.interface";
import { MatDialog } from "@angular/material/dialog";
import { CreateEditTodoDialogComponent } from "./create-edit-todo-dialog/create-edit-todo-dialog.component";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@Component({
	selector: 'app-todos-list',
	standalone: true,
	imports: [
		TodosCardComponent, 
		NgFor, 
		AsyncPipe,
		MatButtonModule,
		MatIconModule
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
		})
	};

	public deleteTodo(id: number) {
		this.todoService.deleteTodo(id);
	};

	public openDialog(todo?: ITodo) {
		let isEdit: boolean = false;
		if (todo) {
			isEdit = true;
		}

		const dialogRef = this.dialog.open(CreateEditTodoDialogComponent, {
			width: '600px',
			data: {
				todo: todo,
				isEdit
			},
		})
			.afterClosed()
			.subscribe(result => {
				if (isEdit && result) {
					this.todoService.editTodo(result);
				} else if (isEdit == false && result) {
					this.todoService.createTodo(result);
				}
			});
	}
}