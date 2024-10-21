import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { IUser } from "../interfaces/user.interface";

@Injectable({
	providedIn: 'root'
})
export class UsersApiService {
	private readonly apiUsers = inject(HttpClient);

	public getUsers() {
		return this.apiUsers.get<IUser[]>('https://jsonplaceholder.typicode.com/users');
	};
}