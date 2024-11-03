import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../interfaces/user.interface';
import { Router } from '@angular/router';
import { IUserOrAdmin } from '../interfaces/user-admin.interface';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	private readonly usersSubject$ = new BehaviorSubject<IUser[]>([]);
	public readonly users$ = this.usersSubject$.asObservable();
	private readonly router = inject(Router);

	public setUser(users: IUser[]): void {
		this.usersSubject$.next(users);
	}

	public editUser(user: IUser): void {
		this.usersSubject$.next(
			this.usersSubject$.value.map(item => (item.id === user.id ? user : item)),
		);
	}

	public createUser(user: IUser): void {
		const userExisting = this.usersSubject$.value.find(
			currentElement => currentElement.email === user.email,
		);
		if (userExisting === undefined)
			this.usersSubject$.next([...this.usersSubject$.value, user]);
		else alert('Такой Email уже есть');
	}

	public deleteUser(id: number): void {
		this.usersSubject$.next(
			this.usersSubject$.value.filter(item => item.id !== id),
		);
	}

	//////////////////////////////////////////////////////////////////

	private userOrAdminSubject$ = new BehaviorSubject<
		IUserOrAdmin | { user: null }
	>({
		user: null,
	});

	public userOrAdmin$ = this.userOrAdminSubject$.asObservable();

	public loginAsAdmin(): void {
		this.userOrAdminSubject$.next({
			name: 'Vasya',
			email: 'vXqFP@example.com',
			isAdmin: true,
		});
	}

	public loginAsUser(): void {
		this.userOrAdminSubject$.next({
			name: 'Vasya',
			email: 'vXqFP@example.com',
			isAdmin: false,
		});
	}

	public isAdmin(): boolean {
		const value = this.userOrAdminSubject$.value;

		if ('isAdmin' in value) {
			return value.isAdmin;
		}
		return false
		// Или какое-то другое значение, когда это { user: null }
	}

	public logout(): void {
		this.userOrAdminSubject$.next({ user: null });
	}
}
