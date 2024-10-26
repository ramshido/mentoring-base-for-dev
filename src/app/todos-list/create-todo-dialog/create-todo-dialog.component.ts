import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MyErrorStateMatcher } from '../../utils/error-state-matcher';
import { MatSelectModule } from '@angular/material/select';
import { ITodo } from '../../interfaces/todo.interface';
import { Subject } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
	MatDialogActions,
	MatDialogClose,
	MatDialogContent,
	MatDialogTitle
} from '@angular/material/dialog';

@Component({
	selector: 'app-create-todo-dialog',
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
	templateUrl: './create-todo-dialog.component.html',
	styleUrl: './create-todo-dialog.component.scss'
})
export class CreateTodoDialogComponent {
	public readonly dataSubject = new Subject<ITodo>();
	public readonly matcher = new MyErrorStateMatcher();

	public readonly form = new FormGroup({
		id: new FormControl(
			new Date().getTime(),
			{ nonNullable: true },
		),
		userId: new FormControl(
			'',
			{
				nonNullable: true,
				validators: [
					Validators.required,
					Validators.maxLength(1),
					Validators.pattern('^[0-9]*$'),
				]
			},
		),
		title: new FormControl(
			'',
			{
				nonNullable: true,
				validators: [Validators.required, Validators.minLength(3)]

			},
		),
		completed: new FormControl(
			true,
			{
				nonNullable: true,
				validators: [Validators.required]
			},
		),
	});

	private sendData(data: ITodo): void {
		this.dataSubject.next(data);
	};

	public closeDialog(): void {
		this.sendData(
			{ ...this.form.getRawValue(), userId: Number() },
		);
		this.form.reset();
	};
}
