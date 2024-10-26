import { Component, inject } from '@angular/core';
import { ITodo } from '../../interfaces/todo.interface';
import { MyErrorStateMatcher } from '../../utils/error-state-matcher';
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import {
	MAT_DIALOG_DATA,
	MatDialogActions,
	MatDialogClose,
	MatDialogContent,
	MatDialogRef,
	MatDialogTitle
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
	selector: 'app-edit-todo-dialog',
	standalone: true,
	imports: [
		NgIf,
		ReactiveFormsModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule,
		MatSelectModule,
		MatFormFieldModule,
		MatDialogTitle,
		MatDialogContent,
		MatDialogActions,
		MatDialogClose,
	],
	templateUrl: './edit-todo-dialog.component.html',
	styleUrl: './edit-todo-dialog.component.scss'
})
export class EditTodoDialogComponent {
	private readonly dialogRef = inject(MatDialogRef<EditTodoDialogComponent>);
	public readonly data = inject<{ todo: ITodo }>(MAT_DIALOG_DATA);
	public readonly matcher = new MyErrorStateMatcher();

	public readonly form = new FormGroup({
		id: new FormControl(
			this.data.todo.id,
		),
		userId: new FormControl(
			this.data.todo.userId,
			[
				Validators.required,
				Validators.maxLength(1),
				Validators.pattern('^[0-9]*$'),
			]
		),
		title: new FormControl(
			this.data.todo.title,
			[Validators.required, Validators.minLength(3)],
		),
		completed: new FormControl(
			this.data.todo.completed,
			[Validators.required],
		),
	});

	public submitForm() {
		this.dialogRef.close(this.form.value);
	};
}
