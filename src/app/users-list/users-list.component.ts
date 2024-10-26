import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserCardComponent } from './user-card/user-card.component';
import { UsersApiService } from '../services/user-api.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { UserService } from '../services/user.service';
import { ICreateUser, IUser } from '../interfaces/user.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  CreateUserDialogComponent
} from './create-user-dialog/create-user-dialog.component';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    UserCardComponent,
    NgFor,
    AsyncPipe,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent {
  private readonly apiUsers = inject(UsersApiService)
  public readonly userService = inject(UserService)
  private readonly dialog = inject(MatDialog)

  constructor() {
    this.apiUsers.getUsers().subscribe((response: IUser[]) => {
      this.userService.setUser(response)
    });
  };

  public deleteUser(id: number): void {
    this.userService.deleteUser(id);
  };

  public createUser(user: ICreateUser): void {
    this.userService.createUser(user);
  };

  public editUser(formDialogValue: IUser): void {
    this.userService.editUser(formDialogValue);
  };

  public openDialog(): void {
    const dialogRef = this.dialog.open(CreateUserDialogComponent, {
      width: '600px',
    });

    const dialogComponentInstance = dialogRef.componentInstance;

    dialogComponentInstance.dataSubject.subscribe((data: ICreateUser) => {
      if (data) {
        this.createUser(data);
      }
    });
  };

}
