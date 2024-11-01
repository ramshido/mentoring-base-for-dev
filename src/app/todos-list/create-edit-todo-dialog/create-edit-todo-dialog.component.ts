import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../utils/error-state-matcher';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { completedValidator } from '../../utils/forms-validators';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
	selector: 'app-create-edit-todo-dialog',
	standalone: true,
	imports: [
		NgIf,
		ReactiveFormsModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule,
		MatDialogTitle,
		MatDialogContent,
		MatDialogActions,
		MatDialogClose,
		MatFormFieldModule,
	],
	templateUrl: './create-edit-todo-dialog.component.html',
	styleUrl: './create-edit-todo-dialog.component.scss'
})
export class CreateEditTodoDialogComponent {
	private readonly dialogRef = inject(MatDialogRef<CreateEditTodoDialogComponent>);
	readonly data = inject(MAT_DIALOG_DATA);

	public readonly form = new FormGroup({
		id: new FormControl(new Date().getTime()),
		userId: new FormControl('', [
			Validators.required,
			Validators.maxLength(1),
			Validators.pattern('^[0-9]*$'),
		]),
		title: new FormControl('', [
			Validators.required,
			Validators.minLength(3),
		]),
		completed: new FormControl('', [
			Validators.required,
			completedValidator()
		]),
	});

	public readonly matcher = new MyErrorStateMatcher();

	ngOnInit(): void {		
		if (this.data.todo) {
			this.form.patchValue({
				...this.data.todo, 
				completed: (this.data.todo.completed === true) ? 'да' : 'нет' 
			});
		}
	}

	public submitForm(): void {
		this.dialogRef.close(this.form.value);
		this.form.reset();
	};
}
