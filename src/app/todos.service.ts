import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITodo } from './Interfaces/ITodoInterface';

@Injectable({
	providedIn: 'root'
})
export class TodosService {
	private readonly todosSubject$ = new BehaviorSubject<ITodo[]>([]);
	public readonly todos$ = this.todosSubject$.asObservable();

	public setTodo(todos: ITodo[]): void {
		this.todosSubject$.next(todos);
	};

	public editTodo(todo: ITodo): void {
		this.todosSubject$.next(
			this.todosSubject$.value.map(item => (item.id === todo.id) ? todo : item)
		);
	};

	public createTodo(todo: ITodo): void {
		const todoExisting = this.todosSubject$.value.find(
			currentElement => currentElement.title === todo.title
		);

		if (todoExisting === undefined) this.todosSubject$.next(
			[...this.todosSubject$.value, todo]
		)
		else alert('Такой todo уже есть');
	};

	public deleteTodo(id: number): void {
		this.todosSubject$.next(
			this.todosSubject$.value.filter(item => item.id !== id)
		);
	};
}
