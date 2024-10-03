import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from './Interfaces/IUserInterface';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	private readonly usersSubject$ = new BehaviorSubject<IUser[]>([]);
	public readonly users$ = this.usersSubject$.asObservable();

	public setUser(users: IUser[]): void {
		this.usersSubject$.next(users);
	};

	public editUser(user: IUser): void {
		this.usersSubject$.next(
			this.usersSubject$.value.map(item => (item.id === user.id) ? user : item)
		);
	};

	public createUser(user: IUser): void {
		const userExisting = this.usersSubject$.value.find(
			currentElement => currentElement.email === user.email
		);
		if (userExisting === undefined) this.usersSubject$.next([...this.usersSubject$.value, user]);
		else alert('Такой Email уже есть');
	};

	public deleteUser(id: number): void {
		this.usersSubject$.next(
			this.usersSubject$.value.filter(item => item.id !== id)
		);
	};
}
