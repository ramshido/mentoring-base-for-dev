import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodosCardComponent } from '../todos-card/todos-card.component';
import { AsyncPipe, NgFor } from '@angular/common';
import { TodosService } from '../../services/todos.service';
import { ITodo } from '../../interfaces/todo.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CreateTodoDialogComponent } from '../create-todo-dialog/create-todo-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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
	public readonly todosService = inject(TodosService);
	private readonly dialog = inject(MatDialog);
	private readonly _snackBar = inject(MatSnackBar);
	public readonly todos$ = this.todosService.todos$;

	constructor() {
		this.todosService.loadTodos();
	}

	public deleteTodo(id: number): void {
		this.todosService.deleteTodo(id);
		this._snackBar
			.open('Todo deleted', 'Ok')
			.afterDismissed()
			.subscribe(() => { });
	}

	public createTodo(todo: ITodo): void {
		this.todosService.createTodo(todo);
		this._snackBar
			.open('Todo created', 'Ok')
			.afterDismissed()
			.subscribe(() => { });
	}

	public editTodo(todo: ITodo) {
		this.todosService.editTodo(todo);
		this._snackBar
			.open('Todo edited', 'Ok')
			.afterDismissed()
			.subscribe(() => { });
	}

	public openDialog(): void {
		const dialogRef = this.dialog.open(CreateTodoDialogComponent, {
			width: '600px'
		});

		const dialogComponentInstance = dialogRef.componentInstance;

		dialogComponentInstance.dataSubject.subscribe((data: ITodo) => {
			if (data) {
				this.createTodo(data);
			}
		});
	}
}
