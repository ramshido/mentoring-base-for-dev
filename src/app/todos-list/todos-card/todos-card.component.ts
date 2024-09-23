import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-todos-card',
  standalone: true,
  imports: [],
  templateUrl: './todos-card.component.html',
  styleUrl: './todos-card.component.scss'
})
export class TodosCardComponent {
	@Input()
	todo: any

	@Output()
	delete = new EventEmitter()

	onDeleteTodo(id: number) {
		this.delete.emit(id);
	}
}
