import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { BackgroundColorChangeDirective } from './directives/background-color-change.directive';
import { AdminOrUserComponent } from './admin-page/admin-or-user/admin-or-user.component';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { IUserOrAdmin } from './interfaces/user-admin.interface';
import { CheckAdminOrUser } from './services/checkAdminOrUser.service';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [
		RouterOutlet,
		RouterLink,
		NgFor,
		NgIf,
		DatePipe,
		BackgroundColorChangeDirective,
		AsyncPipe,
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
	public readonly userService = inject(CheckAdminOrUser);
	public readonly title = 'mentoring-first-project';
	public headerItems = ['Главная', 'Компания'];
	public isAboutUs = true;
	public today: number = Date.now();
	private readonly dialog = inject(MatDialog);

	private readonly router = inject(Router)
	public status: string = '';
	public isShowAdminBtn: boolean = false;

	public userRole$ = this.userService.userOrAdmin$.pipe(
		map((data: IUserOrAdmin | { user: null }) => {
			// for (let key in data) {
			// 	if (key === 'user') {
			// 		this.status = 'Войти';
			// 		return true;
			// 	}
			// }
			// this.status = 'Выйти';
			// return false;

			// или:

			if ('user' in data) {
				this.status = 'Войти';
				this.isShowAdminBtn = false;
				return true;
			} else {
				this.status = 'Выйти';
				this.isShowAdminBtn = true;
				return false;
			}
		})
	);

	public openDialog(): void {
		if (this.status === 'Войти') {
			this.dialog
				.open(AdminOrUserComponent, {
					width: '600px',
				})
				.afterClosed()
				.subscribe((result: any) => {
					if (result === true) {
						this.userService.loginAsAdmin();
					} else if (result === false) {
						this.userService.loginAsUser();
					}
				});
		} else if (this.status === 'Выйти') {
			confirm('Вы точно хотите выйти?') ? (this.userService.logout(), this.router.navigate([''])) : null
		}
	}
}
