import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { CheckAdminOrUser } from '../services/user.service';

export const checkAdminGuard: CanActivateFn = (route, state) => {
  const userService = inject(CheckAdminOrUser);
  const router = inject(Router);

  if (userService.isAdmin() === true) {
    return true;
  } else if (userService.isAdmin() === false) {
    alert('У вас нет админки');
    return false;
  } else {
    router.navigate(['']);
    return false;
  }
};
