import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITodo } from '../interfaces/todo.interface';
import { LocalStorageService } from './local-storage.service';
import { TodosApiService } from './todos-api.service';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private readonly todosSubject$ = new BehaviorSubject<ITodo[]>([]);
  public readonly todos$ = this.todosSubject$.asObservable();
  private readonly localStorageService = inject(LocalStorageService);
  private readonly todosApiService = inject(TodosApiService);
  private readonly localStorageTodoKey = 'todos';

  private setDataToLocalStorageTodoSubject(todosData: ITodo[]): void {
    this.localStorageService.saveDataToLocalStorage<ITodo[]>(
      this.localStorageTodoKey,
      todosData
    );
    this.todosSubject$.next(todosData);
  }

  public loadTodos() {
    const localStorageTodos = this.localStorageService.getDataFromLocalStorage<ITodo[]>(
      this.localStorageTodoKey
    );

    if (localStorageTodos) {
      this.todosSubject$.next(localStorageTodos);
    } else {
      this.todosApiService.getTodos().subscribe((todoData: ITodo[]) => {
        this.setDataToLocalStorageTodoSubject(todoData.slice(1, 11));
      });
    }
  }

  public editTodo(todo: ITodo): void {
    const index = this.todosSubject$.value.findIndex(el => el.id === todo.id);

    this.todosSubject$.value[index] = todo;
    this.setDataToLocalStorageTodoSubject(this.todosSubject$.value);
  }

  public createTodo(todo: ITodo): void {
    const todoExisting = this.todosSubject$.value.find(
      currentElement => currentElement.title === todo.title
    );

    if (todoExisting === undefined) {
      const newTodo = [...this.todosSubject$.value, todo];
      this.setDataToLocalStorageTodoSubject(newTodo);
    } else alert('Такой todo уже есть');
  }

  public deleteTodo(id: number): void {
    const newArrayTodos = this.todosSubject$.value.filter(todo => todo.id !== id);
    const findTodo = this.todosSubject$.value.find(todo => todo.id === id);

    if (findTodo) {
      this.setDataToLocalStorageTodoSubject(newArrayTodos);
    }

    if (!this.todosSubject$.value.length) {
      this.localStorageService.removeLocalStorage(this.localStorageTodoKey);
    }
  }
}
