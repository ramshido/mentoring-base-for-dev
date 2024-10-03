import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from './Interfaces/IUserInterface';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	private readonly usersSubject$ = new BehaviorSubject<IUser[]>([]);
	public readonly users$ = this.usersSubject$.asObservable();

	public setUser(users: IUser[]) {
		this.usersSubject$.next(users);
	};

	public editUser(user: IUser) {
		this.usersSubject$.next(
			this.usersSubject$.value.map(item => (item.id === user.id) ? user : item)
		);
	};

	public addUser(user: IUser) {
		this.usersSubject$.next(
			[...this.usersSubject$.value, user]
		);
	};

	public deleteUser(id: number) {
		this.usersSubject$.next(
			this.usersSubject$.value.filter(item => item.id !== id)
		)
	};
}
