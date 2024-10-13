import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({
	providedIn: 'root'
})
export class TodosApiService {
	readonly todosApi = inject(HttpClient);

	public getTodos() {
		return this.todosApi.get('https://jsonplaceholder.typicode.com/todos');
	};
}