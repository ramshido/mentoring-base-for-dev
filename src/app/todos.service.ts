import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITodo } from './todos-list/todos-list.component';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
	
	private readonly todosSubject$ = new BehaviorSubject<ITodo[]>([]);
	public readonly todos$ = this.todosSubject$.asObservable();

  getTodo(todos: ITodo[]) {
		this.todosSubject$.next(todos);
	}

	editTodo(todo: ITodo) {
		this.todosSubject$.next(
			this.todosSubject$.value.map(item => (item.id === todo.id) ? todo : item)
		)
	}

	addTodo(todo: ITodo) {
		this.todosSubject$.next(
			[...this.todosSubject$.value, todo]
		);
	}

	deleteTodo(id: number) {
		this.todosSubject$.next(
			this.todosSubject$.value.filter(item => item.id !== id)
		)
	}
}
