import { Routes } from '@angular/router';
import { MainContentComponent } from './main-content/main-content.component';
import { UsersListComponent } from './users-list/users-list.component';

export const routes: Routes = [
	{
		path: '',
		component: MainContentComponent
	},
	{
		path: 'users',
		component: UsersListComponent
	}
];
