import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
} from '@angular/material/dialog';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-or-user',
  templateUrl: './admin-or-user.component.html',
  styleUrls: ['./admin-or-user.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
  ],
})
export class AdminOrUserComponent {}
