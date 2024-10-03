import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITodo } from '../../Interfaces/ITodoInterface';

@Component({
	selector: 'app-todos-card',
	standalone: true,
	imports: [],
	templateUrl: './todos-card.component.html',
	styleUrl: './todos-card.component.scss'
})
export class TodosCardComponent {
	@Input()
	public todo!: ITodo;

	@Output()
	public readonly delete = new EventEmitter();

	public onDeleteTodo(id: number) {
		this.delete.emit(id);
	};
}
