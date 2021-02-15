import { WWYDAction, WWYDActions, WWYD } from "../model";

export function addWWYD(wwyd: WWYD): WWYDAction {
	return {
		type: WWYDActions.ADD_WWYD,
		payload: wwyd,
	};
}

export function deleteWWYD(wwydId: number): WWYDAction {
	return {
		type: WWYDActions.DELETE_WWYD,
		payload: wwydId,
	};
}
