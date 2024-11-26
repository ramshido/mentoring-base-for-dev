import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../interfaces/user.interface';
import { UsersApiService } from './user-api.service';
import { UsersActions } from '../state/users.actions';
import { Store } from '@ngrx/store';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	private readonly usersSubject$ = new BehaviorSubject<IUser[]>([]);
	public readonly users$ = this.usersSubject$.asObservable();
	private readonly usersApiService = inject(UsersApiService);
	private readonly store = inject(Store);

	public loadUsers(): void {
		this.usersApiService.getUsers().subscribe((users: IUser[]) => {
			this.usersSubject$.next(users);
			this.store.dispatch(UsersActions.set({ users }));
		});
	}

	public editUser(user: IUser): void {
		const index = this.usersSubject$.value.findIndex(el => el.id === user.id);

		this.usersSubject$.value[index] = user;
		this.usersSubject$.next(this.usersSubject$.value);
		this.store.dispatch(UsersActions.edit({ user }));
	}

	public createUser(user: IUser): void {
		const userExisting = this.usersSubject$.value.find(
			currentElement => currentElement.email === user.email
		);
		if (userExisting === undefined) {
			const newUser = [...this.usersSubject$.value, user];
			this.usersSubject$.next(newUser);
			this.store.dispatch(UsersActions.create({ user }));
		} else alert('Такой Email уже есть');

	}

	public deleteUser(id: number): void {
		const newArrayUsers = this.usersSubject$.value.filter(user => user.id !== id);
		const findUser = this.usersSubject$.value.find(user => user.id === id);

		if (findUser) {
			this.usersSubject$.next(newArrayUsers);
			this.store.dispatch(UsersActions.delete({ id }));
		}
	}
}
