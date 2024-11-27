import { createReducer, on } from '@ngrx/store';
import { ITodo } from '../interfaces/todo.interface';
import { TodosActions } from './todos.actions';

const initialState: { todos: ITodo[] } = {
  todos: []
};

export const todosReducer = createReducer(
  initialState,
  on(TodosActions.set, (state, payLoad) => ({
    ...state,
    todos: payLoad.todos
  })),
  on(TodosActions.edit, (state, payLoad) => ({
    ...state,
    todos: state.todos.map(todo => (todo.id === payLoad.todo.id ? payLoad.todo : todo))
  })),
  on(TodosActions.delete, (state, payLoad) => ({
    ...state,
    todos: state.todos.filter(todo => todo.id !== payLoad.id)
  })),
  on(TodosActions.create, (state, payLoad) => ({
    ...state,
    todos: [...state.todos, payLoad.todo]
  }))
);
