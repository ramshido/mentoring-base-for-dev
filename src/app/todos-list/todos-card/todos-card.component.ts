import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ITodo } from '../../interfaces/todo.interface';
import { MatDialog } from '@angular/material/dialog';
import {
	EditTodoDialogComponent
} from '../edit-todo-dialog/edit-todo-dialog.component';

@Component({
	selector: 'app-todos-card',
	standalone: true,
	imports: [],
	templateUrl: './todos-card.component.html',
	styleUrl: './todos-card.component.scss'
})
export class TodosCardComponent {
	private readonly dialog = inject(MatDialog);

	@Input({ required: true })
	public todo!: ITodo;

	@Output()
	public readonly deleteTodo = new EventEmitter<number>();

	@Output()
	public readonly editTodo = new EventEmitter<ITodo>();

	public onDeleteTodo(id: number): void {
		this.deleteTodo.emit(id);
	};

	public openEditDialog(): void {
		const dialogRef = this.dialog.open(EditTodoDialogComponent, {
			width: '600px',
			data: { todo: this.todo },
		})
			.afterClosed()
			.subscribe((editedResult: ITodo) => {
				if (editedResult) {
					this.editTodo.emit(editedResult);
				}
			});
	};
}
