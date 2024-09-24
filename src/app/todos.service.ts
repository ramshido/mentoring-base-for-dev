import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITodo } from './todos-list/todos-list.component';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
	
	private readonly todosSubject$ = new BehaviorSubject<ITodo[]>([]);
	public readonly todosObservable$ = this.todosSubject$.asObservable();

  gettodo(todos: ITodo[]) {
		this.todosSubject$.next(todos);
	}

	edittodo(todo: ITodo) {
		this.todosSubject$.next(
			this.todosSubject$.value.map(item => (item.id === todo.id) ? todo : item)
		)
	}

	addtodo(todo: ITodo) {
		this.todosSubject$.next(
			[...this.todosSubject$.value, todo]
		);
	}

	deletetodo(id: number) {
		this.todosSubject$.next(
			this.todosSubject$.value.filter(item => item.id !== id)
		)
	}
}
