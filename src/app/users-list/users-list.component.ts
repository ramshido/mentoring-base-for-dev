import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserCardComponent } from './user-card/user-card.component';
import { UsersApiService } from '../services/user-api.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { UserService } from '../services/user.service';
import { CreateUserFormComponent } from '../create-user-form/create-user-form.component';
import { ICreateUser, IUser } from '../interfaces/user.interface';
import { MatDialog } from "@angular/material/dialog";

@Component({
	selector: 'app-users-list',
	standalone: true,
	imports: [UserCardComponent, NgFor, AsyncPipe, CreateUserFormComponent],
	templateUrl: './users-list.component.html',
	styleUrl: './users-list.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent {
	private readonly apiUsers = inject(UsersApiService);
	public readonly userService = inject(UserService);
	private readonly dialog = inject(MatDialog);

	constructor() {
		this.apiUsers.getUsers().subscribe((response: IUser[]) => {
			this.userService.setUser(response);
		})
	};

	public deleteUser(id: number): void {
		this.userService.deleteUser(id);
	};

	public createUser(user: ICreateUser): void {
		this.userService.createUser(user);
	};

}
