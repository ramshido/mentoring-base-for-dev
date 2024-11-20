import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
	MatDialogActions,
	MatDialogClose,
	MatDialogContent,
	MatDialogTitle
} from '@angular/material/dialog';

@Component({
	selector: 'app-delete-todo-dialog',
	standalone: true,
	imports: [
		MatButtonModule,
		MatDialogActions,
		MatDialogClose,
		MatDialogTitle,
		MatDialogContent
	],
	templateUrl: './delete-todo-dialog.component.html',
	styleUrl: './delete-todo-dialog.component.scss'
})
export class DeleteTodoDialogComponent {

}
