import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
	ReactiveFormsModule,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MyErrorStateMatcher } from '../utils/error-state-matcher';
import { completedValidator } from '../utils/forms-validators';

@Component({
	selector: 'app-create-todo-form',
	standalone: true,
	imports: [
		NgIf,
		ReactiveFormsModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule,
	],
	templateUrl: './create-todo-form.component.html',
	styleUrl: './create-todo-form.component.scss'
})
export class CreateTodoFormComponent {
	@Output()
	public readonly createTodo = new EventEmitter();

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
			completedValidator(),
		]),
	});
	
	public readonly matcher = new MyErrorStateMatcher();

	private getCompletedValue(): boolean {
		if (this.form.get('completed')?.value!.trim().toLowerCase() === 'да') {
			return true;
		} else return false;
	};

	public submitForm(): void {
		this.createTodo.emit(
			{ ...this.form.value, completed: this.getCompletedValue() }
		);
		this.form.reset();
	};
}
