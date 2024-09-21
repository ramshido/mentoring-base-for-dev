import { Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
	@Input()
	user: any;

	@Output()
	delete = new EventEmitter();

	onDelete(userId: number) {
		this.delete.emit(userId);
	}
}
