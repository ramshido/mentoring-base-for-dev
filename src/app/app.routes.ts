import { Routes } from '@angular/router';
import { MainContentComponent } from './main-content/main-content.component';
import { UsersListComponent } from './users-list/users-list.component';
import { TodosListComponent } from './todos-list/todos-list.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { checkAdminGuard } from './guards/срñcheck-admin.guard';
import { exitGuard } from './guards/exit.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainContentComponent,
  },
  {
    path: 'users',
    component: UsersListComponent,
  },
  {
    path: 'todos',
    component: TodosListComponent,
  },
  {
    path: 'admin',
    component: AdminPageComponent,
    canActivate: [checkAdminGuard],
    canDeactivate: [exitGuard],
  },
];
