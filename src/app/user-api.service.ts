import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})

export class UsersApiService {
	readonly apiUsers = inject(HttpClient);

	getUsers() {
		return this.apiUsers.get('https://jsonplaceholder.typicode.com/users');
	}
}