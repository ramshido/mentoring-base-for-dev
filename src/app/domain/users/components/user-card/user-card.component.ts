import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IUser } from '../../interfaces/user.interface';
import { MatDialog } from '@angular/material/dialog';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { DeleteUserDialogComponent } from '../delete-user-dialog/delete-user-dialog.component';
import { DashesDeletePipe } from '../../../../shared/pipes/dashes-delete.pipe';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [DashesDeletePipe],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  private readonly dialog = inject(MatDialog);

  @Input({ required: true })
  public user!: IUser;

  @Output()
  public readonly deleteUser = new EventEmitter<number>();

  @Output()
  public readonly editUser = new EventEmitter<IUser>();

  public onDelete(userId: number) {
    this.dialog
      .open(DeleteUserDialogComponent)
      .afterClosed()
      .subscribe((deleteResult: boolean) => {
        if (deleteResult) {
          this.deleteUser.emit(userId);
        }
      });
  }

  public openEditDialog(): void {
    const dialogRef = this.dialog
      .open(EditUserDialogComponent, {
        width: '600px',
        data: { user: this.user }
      })
      .afterClosed()
      .subscribe((editedResult: IUser) => {
        if (editedResult) {
          this.editUser.emit(editedResult);
        }
      });
  }
}
