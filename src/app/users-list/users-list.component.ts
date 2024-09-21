import { Component, inject } from '@angular/core';
import { UserCardComponent } from './user-card/user-card.component';
import { UsersApiService } from '../user-api.service';
import { NgFor } from '@angular/common';

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
  imports: [UserCardComponent, NgFor],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
	readonly apiUsers = inject(UsersApiService);

	users: IUser[] = [];
	
	constructor() {
		this.apiUsers.getUsers().subscribe((response: any) => {
			this.users = response;
		})
	}

	deleteUser(id: number) {
		this.users = this.users.filter(item => item.id !== id);
	}

}
