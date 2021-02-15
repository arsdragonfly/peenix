import { History } from "history";
import { combineReducers } from "redux";
import { Todo, WWYD } from "../model";
import * as todoReducer from "./todo";
import * as WWYDReducer from "./WWYD"

export interface RootState {
	todoList: Todo[];
	WWYDList: WWYD[];
}

export default (history: History) =>
	combineReducers({
		...todoReducer,
		...WWYDReducer
	});
