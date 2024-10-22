import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MyErrorStateMatcher } from '../../utils/error-state-matcher';
import { Subject } from 'rxjs';
import { ICreateUser } from '../../interfaces/user.interface';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

type FormControls<T> = {
	[K in keyof T]: T[K] extends object
	? FormGroup<FormControls<T[K]>>
	: FormControl<T[K]>;
};

@Component({
	selector: 'app-create-user-dialog',
	standalone: true,
	imports: [
		NgIf,
		ReactiveFormsModule,
		MatDialogTitle,
		MatDialogContent,
		MatDialogActions,
		MatDialogClose,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule,
	],
	templateUrl: './create-user-dialog.component.html',
	styleUrl: './create-user-dialog.component.scss'
})
export class CreateUserDialogComponent {
	public readonly matcher = new MyErrorStateMatcher();
	public readonly dataSubject = new Subject<ICreateUser>();

	public readonly form: FormGroup<FormControls<ICreateUser>> = new FormGroup({
		id: new FormControl(new Date().getTime(), { nonNullable: true }),
		name: new FormControl(
			'',
			{ nonNullable: true, validators: [Validators.required, Validators.minLength(2)] },
		),
		email: new FormControl(
			'',
			{ nonNullable: true, validators: [Validators.required, Validators.email] },
		),
		website: new FormControl(
			'',
			{ nonNullable: true, validators: [Validators.required, Validators.minLength(3)] },
		),
		company: new FormGroup({
			name: new FormControl(
				'',
				{ nonNullable: true, validators: [Validators.required, Validators.minLength(2)] },
			),
		}),
	});

	private sendData(data: ICreateUser): void {
		this.dataSubject.next(data);
	};

	public closeDialog(): void {
		this.sendData(this.form.getRawValue());
		this.form.reset();
	};
}
