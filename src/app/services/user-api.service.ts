import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({
	providedIn: 'root'
})
export class UsersApiService {
	private readonly apiUsers = inject(HttpClient);

	public getUsers() {
		return this.apiUsers.get('https://jsonplaceholder.typicode.com/users');
	};
}