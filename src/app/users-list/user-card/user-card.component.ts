import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../../Interfaces/IUserInterface';

@Component({
	selector: 'app-user-card',
	standalone: true,
	imports: [],
	templateUrl: './user-card.component.html',
	styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
	@Input()
	public user!: IUser;

	@Output()
	public readonly delete = new EventEmitter();

	public onDelete(userId: number) {
		this.delete.emit(userId);
	};
}
