import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../interfaces/user.interface';
import { LocalStorageService } from '../../../singleton/local-storage.service';
import { UsersApiService } from './user-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly usersSubject$ = new BehaviorSubject<IUser[]>([]);
  public readonly users$ = this.usersSubject$.asObservable();
  private readonly localStorageService = inject(LocalStorageService);
  private readonly usersApiService = inject(UsersApiService);
  private readonly localStorageUsersKey = 'users';

  private setDataToLocalStorageUsersSubject(usersData: IUser[]): void {
    this.localStorageService.saveDataToLocalStorage<IUser[]>(
      this.localStorageUsersKey,
      usersData
    );
    this.usersSubject$.next(usersData);
  }

  public loadUsers(): void {
    const localStorageUsers =
      this.localStorageService.getDataFromLocalStorage<IUser[]>('users');

    if (localStorageUsers) {
      this.usersSubject$.next(localStorageUsers);
    } else {
      this.usersApiService.getUsers().subscribe((users: IUser[]) => {
        this.setDataToLocalStorageUsersSubject(users);
      });
    }
  }

  public editUser(user: IUser): void {
    const index = this.usersSubject$.value.findIndex(el => el.id === user.id);

    this.usersSubject$.value[index] = user;
    this.setDataToLocalStorageUsersSubject(this.usersSubject$.value);
  }

  public createUser(user: IUser): void {
    const userExisting = this.usersSubject$.value.find(
      currentElement => currentElement.email === user.email
    );
    if (userExisting === undefined) {
      const newUser = [...this.usersSubject$.value, user];
      this.setDataToLocalStorageUsersSubject(newUser);
    } else alert('Такой Email уже есть');
  }

  public deleteUser(userId: number): void {
    const newArrayUsers = this.usersSubject$.value.filter(user => user.id !== userId);
    const findUser = this.usersSubject$.value.find(user => user.id === userId);

    if (findUser) {
      this.setDataToLocalStorageUsersSubject(newArrayUsers);
    }

    if (!this.usersSubject$.value.length) {
      this.localStorageService.removeLocalStorage(this.localStorageUsersKey);
    }
  }
}
