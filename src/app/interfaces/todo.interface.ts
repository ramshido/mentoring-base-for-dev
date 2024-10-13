export interface ITodo {
	userId: number
	id: number
	title: string
	completed: boolean
}

export interface ICreateTodo {
	userId: number
	title: string
	completed: boolean
}