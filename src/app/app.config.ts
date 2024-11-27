import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig } from '@angular/material/dialog';
import { provideStore } from '@ngrx/store';
import { usersReducer } from './domain/users/+state/users.reducers';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { todosReducer } from './domain/todos/+state/todos.reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        subscriptSizing: 'dynamic'
      }
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: { autoFocus: false } as MatDialogConfig
    },
    provideStore({
      users: usersReducer,
      todos: todosReducer
    }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
  ]
};
