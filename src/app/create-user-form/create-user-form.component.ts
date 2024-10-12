import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
	NgForm,
	ReactiveFormsModule,
	AbstractControl,
	FormControl,
	FormGroup,
	FormGroupDirective,
	FormsModule,
	Validators
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export class MyErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: AbstractControl | null, form: FormGroupDirective | NgForm | null): boolean {
		const isSubmitted = form && form.submitted;
		return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
	};
}

@Component({
	selector: 'app-create-user-form',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		NgIf,
		FormsModule,
		MatInputModule,
		MatFormFieldModule,
		MatDividerModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule,
	],
	templateUrl: './create-user-form.component.html',
	styleUrl: './create-user-form.component.scss',
})
export class CreateUserFormComponent {
	@Output()
	public readonly createUser = new EventEmitter();

	public readonly form = new FormGroup({
		name: new FormControl('', [Validators.required, Validators.minLength(2)]),
		email: new FormControl('', [Validators.required, Validators.email]),
		website: new FormControl('', [Validators.required, Validators.minLength(3)]),
		companyName: new FormControl('', [Validators.required, Validators.minLength(2)]),
	});

	public readonly matcher = new MyErrorStateMatcher();

	public submitForm(): void {
		this.createUser.emit(this.form.value);
		this.form.reset();
	};
}
