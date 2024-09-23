import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";


@Injectable({providedIn: 'root'})

export class TodosApiService {
	getUsers() {
		throw new Error("Method not implemented.");
	}
	readonly todosApi = inject(HttpClient)

	getTodos() {
		return this.todosApi.get('https://jsonplaceholder.typicode.com/todos')
	}
}