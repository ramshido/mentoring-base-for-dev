import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITodo } from './Interfaces/ITodoInterface';

@Injectable({
	providedIn: 'root'
})
export class TodosService {

	private readonly todosSubject$ = new BehaviorSubject<ITodo[]>([]);
	public readonly todos$ = this.todosSubject$.asObservable();

	public setTodo(todos: ITodo[]) {
		this.todosSubject$.next(todos);
	};

	public editTodo(todo: ITodo) {
		this.todosSubject$.next(
			this.todosSubject$.value.map(item => (item.id === todo.id) ? todo : item)
		);
	};

	public addTodo(todo: ITodo) {
		this.todosSubject$.next(
			[...this.todosSubject$.value, todo]
		);
	};

	public deleteTodo(id: number) {
		this.todosSubject$.next(
			this.todosSubject$.value.filter(item => item.id !== id)
		);
	};
}
