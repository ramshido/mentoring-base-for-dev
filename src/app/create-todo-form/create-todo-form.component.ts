import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
	AbstractControl,
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	ValidationErrors,
	ValidatorFn,
	Validators
} from '@angular/forms';

export function completedValidator(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const value = control.value?.trim().toLowerCase();
		if (value === 'да' || value === 'нет') return null;
		return { invalidCompleted: true };
	};
};

@Component({
	selector: 'app-create-todo-form',
	standalone: true,
	imports: [ReactiveFormsModule, NgIf],
	templateUrl: './create-todo-form.component.html',
	styleUrl: './create-todo-form.component.scss'
})
export class CreateTodoFormComponent {
	@Output()
	public readonly createTodo = new EventEmitter();

	public form = new FormGroup({
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

	private getCompletedValue(): boolean {
		return (
			this.form.get('completed')?.value!
				.trim()
				.toLowerCase() === 'да' ? true : false
		);
	};

	public submitForm(): void {
		this.createTodo.emit(
			{ ...this.form.value, completed: this.getCompletedValue() }
		);
		this.form.reset();
	};
}
