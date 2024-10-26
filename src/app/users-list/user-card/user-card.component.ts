import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IUser } from '../../interfaces/user.interface';
import { MatDialog } from '@angular/material/dialog';
import {
  EditUserDialogComponent
} from '../edit-user-dialog/edit-user-dialog.component';

@Component({
	selector: 'app-user-card',
	standalone: true,
	imports: [],
	templateUrl: './user-card.component.html',
	styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
	private readonly dialog = inject(MatDialog)

	@Input({ required: true })
	public user!: IUser;

	@Output()
	public readonly deleteUser = new EventEmitter<number>();

	@Output()
	public readonly editUser = new EventEmitter<IUser>();

	public onDelete(userId: number) {
		this.deleteUser.emit(userId);
	};

	public openEditDialog(): void {
		const dialogRef = this.dialog.open(EditUserDialogComponent, {
			width: '600px',
			data: { user: this.user },
		})
		.afterClosed()
		.subscribe((editedResult: IUser) => {
			if (editedResult) {
				this.editUser.emit(editedResult);
			}
		});
	}
}
