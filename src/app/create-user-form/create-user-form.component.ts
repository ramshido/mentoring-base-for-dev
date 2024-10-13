import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
	ReactiveFormsModule,
	FormControl,
	FormGroup,
	Validators
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MyErrorStateMatcher } from '../utils/error-state-matcher';

@Component({
	selector: 'app-create-user-form',
	standalone: true,
	imports: [
		NgIf,
		ReactiveFormsModule,
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

