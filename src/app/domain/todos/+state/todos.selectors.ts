import { ITodo } from '../interfaces/todo.interface';
import { createSelector } from '@ngrx/store';

interface ITodosState {
  todos: ITodo[];
}

interface AppState {
  todos: ITodosState;
}

export const selectTodosFeature = (state: AppState) => state.todos;

export const selectFeature = createSelector(
  selectTodosFeature,
  (state: ITodosState) => state.todos
);
