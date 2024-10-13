import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITodo } from '../../interfaces/todo.interface';

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
	public readonly deleteTodo = new EventEmitter();

	public onDeleteTodo(id: number) {
		this.deleteTodo.emit(id);
	};
}
