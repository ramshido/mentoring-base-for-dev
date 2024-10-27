import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
	MatDialogActions,
	MatDialogClose,
	MatDialogContent,
	MatDialogTitle
} from '@angular/material/dialog';

@Component({
	selector: 'app-delete-user-dialog',
	standalone: true,
	imports: [
		MatButtonModule,
		MatDialogActions,
		MatDialogClose,
		MatDialogTitle,
		MatDialogContent
	],
	templateUrl: './delete-user-dialog.component.html',
	styleUrl: './delete-user-dialog.component.scss'
})
export class DeleteUserDialogComponent {

}
