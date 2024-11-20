import { Routes } from '@angular/router';
import { MainContentComponent } from './domain/home-page/main-content/main-content.component';
import { UsersListComponent } from './domain/users/components/users-list/users-list.component';
import { TodosListComponent } from './domain/todos/components/todos-list/todos-list.component';
import { AdminPageComponent } from './domain/admin-page/admin-page.component';
import { exitGuard } from './domain/admin-page/guards/exit.guard';
import { checkAdminGuard } from './domain/admin-page/guards/check-admin.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainContentComponent
  },
  {
    path: 'users',
    component: UsersListComponent
  },
  {
    path: 'todos',
    component: TodosListComponent
  },
  {
    path: 'admin',
    component: AdminPageComponent,
    canActivate: [checkAdminGuard],
    canDeactivate: [exitGuard]
  }
];
