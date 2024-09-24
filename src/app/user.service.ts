import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from './users-list/users-list.component';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	private readonly usersSubject$ = new BehaviorSubject<IUser[]>([]);
	public readonly users$ = this.usersSubject$.asObservable();

	getUser(users: IUser[]) {
		this.usersSubject$.next(users);
	}

	editUser(user: IUser) {
		this.usersSubject$.next(
			this.usersSubject$.value.map(item => (item.id === user.id) ? user : item)
		)
	}

	addUser(user: IUser) {
		this.usersSubject$.next(
			[...this.usersSubject$.value, user]
		);
	}

	deleteUser(id: number) {
		this.usersSubject$.next(
			this.usersSubject$.value.filter(item => item.id !== id)
		)
	}
}
