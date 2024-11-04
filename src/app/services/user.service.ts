import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IUserOrAdmin } from "../interfaces/user-admin.interface";

@Injectable({
	providedIn: 'root',
})
export class CheckAdminOrUser {
	private userOrAdminSubject$ = new BehaviorSubject<IUserOrAdmin | null>(null);

	private user = {
		name: 'Vasya',
		email: 'vXqFP@example.com',
		isAdmin: false,
	}

	public userOrAdmin$ = this.userOrAdminSubject$.asObservable();

	public loginAsAdmin(): void {
		this.userOrAdminSubject$.next({
			...this.user,
			isAdmin: true
		});
	}

	public loginAsUser(): void {
		this.userOrAdminSubject$.next(this.user);
	}

	public isAdmin(): boolean {
		const value = this.userOrAdminSubject$.value;

		if (value != null) {
			return value.isAdmin;
		}
		return false
		// Или какое-то другое значение, когда это { user: null }
	}

	public logout(): void {
		this.userOrAdminSubject$.next(null);
	}
}