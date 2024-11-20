import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ITodo } from '../../interfaces/todo.interface';
import { MatDialog } from '@angular/material/dialog';
import { EditTodoDialogComponent } from '../edit-todo-dialog/edit-todo-dialog.component';
import { DeleteTodoDialogComponent } from '../delete-todo-dialog/delete-todo-dialog.component';
import { CharacterLimiterPipe } from '../../../../shared/pipes/character-limiter.pipe';

@Component({
  selector: 'app-todos-card',
  standalone: true,
  imports: [CharacterLimiterPipe],
  templateUrl: './todos-card.component.html',
  styleUrl: './todos-card.component.scss'
})
export class TodosCardComponent {
  private readonly dialog = inject(MatDialog);

  @Input({ required: true })
  public todo!: ITodo;

  @Output()
  public readonly deleteTodo = new EventEmitter<number>();

  @Output()
  public readonly editTodo = new EventEmitter<ITodo>();

  public onDeleteTodo(id: number): void {
    this.dialog
      .open(DeleteTodoDialogComponent)
      .afterClosed()
      .subscribe((deleteResult: boolean) => {
        if (deleteResult) {
          this.deleteTodo.emit(id);
        }
      });
  }

  public openEditDialog(): void {
    const dialogRef = this.dialog
      .open(EditTodoDialogComponent, {
        width: '600px',
        data: { todo: this.todo }
      })
      .afterClosed()
      .subscribe((editedResult: ITodo) => {
        if (editedResult) {
          this.editTodo.emit(editedResult);
        }
      });
  }
}
