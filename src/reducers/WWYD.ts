// import { TodoAction, TodoActions, Todo } from "../model";
import { WWYDAction, WWYDActions, WWYD } from "../model";
import createReducer from "./createReducer";

export const WWYDList = createReducer<WWYD[]>([], {
	[WWYDActions.ADD_WWYD](state: WWYD[], action: WWYDAction) {
		return [...state, action.payload];
	},
	/*
	[TodoActions.COMPLETE_TODO](state: Todo[], action: TodoAction) {
		// search after todo item with the given id and set completed to true
		return state.map(t =>
			t.id === action.payload ? { ...t, completed: true } : t
		);
	},
	[TodoActions.UNCOMPLETE_TODO](state: Todo[], action: TodoAction) {
		// search after todo item with the given id and set completed to false
		return state.map(t =>
			t.id === action.payload ? { ...t, completed: false } : t
		);
	},
	*/
	[WWYDActions.DELETE_WWYD](state: WWYD[], action: WWYDAction) {
		// remove all WWYDs with the given id
		return state.filter(t => t.id !== action.payload);
	},
});
