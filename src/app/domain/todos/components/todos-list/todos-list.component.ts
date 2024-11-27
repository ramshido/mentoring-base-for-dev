import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodosCardComponent } from '../todos-card/todos-card.component';
import { AsyncPipe, NgFor } from '@angular/common';
import { ITodo } from '../../interfaces/todo.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CreateTodoDialogComponent } from '../create-todo-dialog/create-todo-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { TodosApiService } from '../../services/todos-api.service';
import { TodosActions } from '../../+state/todos.actions';
import { selectFeature } from '../../+state/todos.selectors';

@Component({
  selector: 'app-todos-list',
  standalone: true,
  imports: [TodosCardComponent, NgFor, AsyncPipe, MatButtonModule, MatIconModule],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosListComponent {
  private readonly dialog = inject(MatDialog);
  private readonly _snackBar = inject(MatSnackBar);
  private readonly store = inject(Store);
  public readonly todos$ = this.store.select(selectFeature);
  private readonly todosApiService = inject(TodosApiService);

  constructor() {
    this.todosApiService.getTodos().subscribe((todosData: ITodo[]) => {
      this.store.dispatch(TodosActions.set({ todos: todosData.slice(0, 10) }));
    });
  }

  public deleteTodo(id: number): void {
    this.store.dispatch(TodosActions.delete({ id }));
    this._snackBar
      .open('Todo deleted', 'Ok')
      .afterDismissed()
      .subscribe(() => {});
  }

  public createTodo(todo: ITodo): void {
    this.store.dispatch(TodosActions.create({ todo }));
    this._snackBar
      .open('Todo created', 'Ok')
      .afterDismissed()
      .subscribe(() => {});
  }

  public editTodo(todo: ITodo) {
    this.store.dispatch(TodosActions.edit({ todo }));
    this._snackBar
      .open('Todo edited', 'Ok')
      .afterDismissed()
      .subscribe(() => {});
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(CreateTodoDialogComponent, {
      width: '600px'
    });

    const dialogComponentInstance = dialogRef.componentInstance;

    dialogComponentInstance.dataSubject.subscribe((data: ITodo) => {
      if (data) {
        this.createTodo(data);
      }
    });
  }
}
