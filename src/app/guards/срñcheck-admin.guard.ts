import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';

const userService = inject(UserService);

const getAsync = (): Promise<boolean> => {
  // для ассинхронных запросов
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
};

// const userService = inject(UserService);

export const checkAdminGuard: CanActivateFn = (route, state) => {
  return confirm('Войти?');
  // return getAsync();
  // if (userService.isAdminValue) {
  //   alert('Вы вошли как админ');
  //   return true;
  // } else {
  //   alert('Вы не вошли как админ');
  //   return false;
  // }
};
