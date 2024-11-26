import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITodo } from '../interfaces/todo.interface';
import { TodosApiService } from './todos-api.service';

@Injectable({
	providedIn: 'root'
})
export class TodosService {
	private readonly todosSubject$ = new BehaviorSubject<ITodo[]>([]);
	public readonly todos$ = this.todosSubject$.asObservable();
	private readonly todosApiService = inject(TodosApiService);

	public loadTodos() {
		this.todosApiService.getTodos().subscribe((todosData: ITodo[]) => {
			this.todosSubject$.next(todosData.slice(0, 10));
		});
	}

	public editTodo(todo: ITodo): void {
		const index = this.todosSubject$.value.findIndex(el => el.id === todo.id);

		this.todosSubject$.value[index] = todo;
		this.todosSubject$.next(this.todosSubject$.value);
	}

	public createTodo(todo: ITodo): void {
		const todoExisting = this.todosSubject$.value.find(
			currentElement => currentElement.title === todo.title
		);

		if (todoExisting === undefined) {
			const newTodo = [...this.todosSubject$.value, todo];
			this.todosSubject$.next(newTodo);
		} else alert('Такой todo уже есть');
	}

	public deleteTodo(id: number): void {
		const newArrayTodos = this.todosSubject$.value.filter(todo => todo.id !== id);
		const findTodo = this.todosSubject$.value.find(todo => todo.id === id);

		if (findTodo) {
			this.todosSubject$.next(newArrayTodos);
		}
	}
}
