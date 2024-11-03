import { CanDeactivateFn } from '@angular/router';
import { AdminPageComponent } from '../admin-page/admin-page.component';

export const exitGuard: CanDeactivateFn<AdminPageComponent> = (
  component: AdminPageComponent,
  currentRoute,
  currentState,
  nextState,
) => {
  return component.canExit ? confirm('Хотите уйти?') : true;
};
