import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserCardComponent } from '../user-card/user-card.component';
import { AsyncPipe, NgFor } from '@angular/common';
import { UserService } from '../../services/users.service';
import { ICreateUser, IUser } from '../../interfaces/user.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CreateUserDialogComponent } from '../create-user-dialog/create-user-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShadowsDirective } from '../../../../shared/directives/shadows.directive';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    UserCardComponent,
    NgFor,
    AsyncPipe,
    MatButtonModule,
    MatIconModule,
    ShadowsDirective
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent {
  public readonly userService = inject(UserService);
  private readonly dialog = inject(MatDialog);
  private readonly _snackBar = inject(MatSnackBar);

  constructor() {
    this.userService.loadUsers();
  }

  public deleteUser(id: number): void {
    if (confirm('Вы точно хотите удалить карточку пользователя?')) {
      this.userService.deleteUser(id);
      this._snackBar
        .open('User deleted', 'Ok')
        .afterDismissed()
        .subscribe(() => {});
    }
  }

  public createUser(user: ICreateUser): void {
    this.userService.createUser(user);
    this._snackBar
      .open('User created', 'Ok')
      .afterDismissed()
      .subscribe(() => {});
  }

  public editUser(formDialogValue: IUser): void {
    this.userService.editUser(formDialogValue);
    this._snackBar
      .open('User edited', 'Ok')
      .afterDismissed()
      .subscribe(() => {});
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(CreateUserDialogComponent, {
      width: '600px'
    });

    const dialogComponentInstance = dialogRef.componentInstance;

    dialogComponentInstance.dataSubject.subscribe((data: ICreateUser) => {
      if (data) {
        this.createUser(data);
      }
    });
  }
}
