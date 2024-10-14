export interface ITodo {
	userId: number
	id: number
	title: string
	completed: boolean
}

export interface ICreateTodo extends Omit<ITodo, 'id'> { }