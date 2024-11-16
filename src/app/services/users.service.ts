import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../interfaces/user.interface';
import { LocalStorageService } from './local-storage.service';
import { UsersApiService } from './user-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly usersSubject$ = new BehaviorSubject<IUser[]>([]);
  public readonly users$ = this.usersSubject$.asObservable();
  private readonly localStorageService = inject(LocalStorageService);
  private readonly usersApiService = inject(UsersApiService);

  public loadUsers(): void {
    const localStorageUsers =
      this.localStorageService.getDataFromLocalStorage<IUser[]>('users');

    if (localStorageUsers) {
      this.usersSubject$.next(localStorageUsers);
    } else {
      this.usersApiService.getUsers().subscribe((users: IUser[]) => {
        this.localStorageService.saveDataToLocalStorage<IUser[]>('users', users);
        this.usersSubject$.next(users);
      });
    }
  }

  public editUser(user: IUser): void {
    const index = this.usersSubject$.value.findIndex(el => el.id === user.id);

    this.usersSubject$.value[index] = user;
    this.localStorageService.saveDataToLocalStorage<IUser[]>(
      'users',
      this.usersSubject$.value
    );
    this.usersSubject$.next(this.usersSubject$.value);
  }

  public createUser(user: IUser): void {
    const userExisting = this.usersSubject$.value.find(
      currentElement => currentElement.email === user.email
    );
    if (userExisting === undefined) {
      const newUser = [...this.usersSubject$.value, user];
      this.localStorageService.saveDataToLocalStorage<IUser[]>('users', newUser);
      this.usersSubject$.next(newUser);
    } else alert('Такой Email уже есть');
  }

  public deleteUser(userId: number): void {
    const newArrayUsers = this.usersSubject$.value.filter(user => user.id !== userId);
    const findUser = this.usersSubject$.value.find(user => user.id === userId);

    if (findUser) {
      this.localStorageService.saveDataToLocalStorage<IUser[]>('users', newArrayUsers);
      this.usersSubject$.next(newArrayUsers);
    }

    if (!this.usersSubject$.value.length) {
      this.localStorageService.removeLocalStorage('users');
    }
  }
}
