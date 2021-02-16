import { History } from "history";
import { combineReducers } from "redux";
import { WWYD } from "../model";
import * as WWYDReducer from "./WWYD"

export interface RootState {
	WWYDList: WWYD[];
}

export default (history: History) =>
	combineReducers({
		...WWYDReducer
	});
