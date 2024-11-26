import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserCardComponent } from '../user-card/user-card.component';
import { AsyncPipe, NgFor } from '@angular/common';
import { ICreateUser, IUser } from '../../interfaces/user.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CreateUserDialogComponent } from '../create-user-dialog/create-user-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShadowsDirective } from '../../../../shared/directives/shadows.directive';
import { Store } from '@ngrx/store';
import { selecUsers } from '../../state/users.selectors';
import { UsersActions } from '../../state/users.actions';
import { UsersApiService } from '../../services/user-api.service';

@Component({
	selector: 'app-users-list',
	standalone: true,
	imports: [
		UserCardComponent,
		NgFor,
		AsyncPipe,
		MatButtonModule,
		MatIconModule,
		ShadowsDirective
	],
	templateUrl: './users-list.component.html',
	styleUrl: './users-list.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent {
	private readonly dialog = inject(MatDialog);
	private readonly _snackBar = inject(MatSnackBar);
	private readonly store = inject(Store);
	public readonly users$ = this.store.select(selecUsers);
	private readonly usersApiService = inject(UsersApiService);

	constructor() {
		this.usersApiService.getUsers().subscribe((users: IUser[]) => {
			this.store.dispatch(UsersActions.set({ users }));
		});
	}

	public deleteUser(id: number): void {
		if (confirm('Вы точно хотите удалить карточку пользователя?')) {
			this.store.dispatch(UsersActions.delete({ id }));
			this._snackBar
				.open('User deleted', 'Ok')
				.afterDismissed()
				.subscribe(() => { });
		}
	}

	public createUser(user: ICreateUser): void {
		this.store.dispatch(UsersActions.create({ user }));
		this._snackBar
			.open('User created', 'Ok')
			.afterDismissed()
			.subscribe(() => { });
	}

	public editUser(user: IUser): void {
		this.store.dispatch(UsersActions.edit({ user }));
		this._snackBar
			.open('User edited', 'Ok')
			.afterDismissed()
			.subscribe(() => { });
	}

	public openDialog(): void {
		const dialogRef = this.dialog.open(CreateUserDialogComponent, {
			width: '600px'
		});

		const dialogComponentInstance = dialogRef.componentInstance;

		dialogComponentInstance.dataSubject.subscribe((data: ICreateUser) => {
			if (data) {
				this.createUser(data);
			}
		});
	}
}
