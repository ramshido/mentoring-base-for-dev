import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { CheckAdminOrUser } from '../services/user.service';
// import { map } from 'rxjs';
 
// для ассинхронных запросов
// const getAsync = (): Promise<boolean> => { 	
// 	return new Promise((resolve, reject) => {
// 		setTimeout(() => {
// 			resolve(true);
// 		}, 2000);
// 	});
// };

// const userService = inject(UserService);

export const checkAdminGuard: CanActivateFn = (route, state) => {
	// return confirm('Войти?');

	// return getAsync();
	// if (userService.isAdminValue) {
	//   alert('Вы вошли как админ');
	//   return true;
	// } else {
	//   alert('Вы не вошли как админ');
	//   return false;
	// }
	/////////////////////////////////////////////----Ilnur feature for guards module
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
	// 2-ой способ
	// return userService.userOrAdmin$.pipe(
	// 	map((user) => {
	// 		if ('isAdmin' in user) {
	// 			if (user.isAdmin === true) return true;
	// 		}
	// 		router.navigate(['']);
	// 		return false;

	// 	})
	// );
};
