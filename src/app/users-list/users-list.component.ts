import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserCardComponent } from './user-card/user-card.component';
import { UsersApiService } from '../user-api.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { UserService } from '../user.service';

@Component({
	selector: 'app-users-list',
	standalone: true,
	imports: [UserCardComponent, NgFor, AsyncPipe],
	templateUrl: './users-list.component.html',
	styleUrl: './users-list.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent {
	private readonly apiUsers = inject(UsersApiService);
	public readonly userService = inject(UserService);

	constructor() {
		this.apiUsers.getUsers().subscribe((response: any) => {
			this.userService.setUser(response);
		})
	};

	public deleteUser(id: number) {
		this.userService.deleteUser(id);
	};

}
