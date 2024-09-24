import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserCardComponent } from './user-card/user-card.component';
import { UsersApiService } from '../user-api.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { UserService } from '../user.service';

export interface IUser {
	id: number,
	name: string,
	username: string,
	email: string,
	address: {
		street: string,
		suites: string,
		city: string,
		zipcode: string,
		geo: {
			lat: string,
			lng: string
		};
	};
	phone: string,
	website: string,
	company: {
		name: string,
		catchPhrase: string,
		bs: string
	};
}

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [UserCardComponent, NgFor, AsyncPipe],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent {
	readonly apiUsers = inject(UsersApiService);
	readonly userService = inject(UserService);
	
	constructor() {
		this.apiUsers.getUsers().subscribe((response: any) => {
			this.userService.getUser(response);
		})
	}

	deleteUser(id: number) {
		this.userService.deleteUser(id);
	}

}
