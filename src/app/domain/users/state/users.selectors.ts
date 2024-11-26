import { createSelector } from "@ngrx/store";
import { IUser } from "../interfaces/user.interface";

interface UsersState {
	users: IUser[],
}

interface AppState {
	users: UsersState
}

export const selectUsersFeature = (state: AppState) => state.users;

export const selecUsers = createSelector(
	selectUsersFeature,
	(state: UsersState) => state.users
);