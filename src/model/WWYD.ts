import { Hand } from "./hand"
import { Tile } from "./tile"

export interface WWYD {
  id: number;
  hand: Hand;
  discard: Tile;
}

export enum WWYDActions {
  ADD_WWYD = "ADD_WWYD",
  DELETE_WWYD = "DELETE_WWYD",
  // COMPLETE_TODO = "COMPLETE_TODO",
  // UNCOMPLETE_TODO = "UNCOMPLETE_TODO",
}

interface WWYDActionType<T, P> {
  type: T;
  payload: P;
}

export type WWYDAction =
  | WWYDActionType<typeof WWYDActions.ADD_WWYD, WWYD>
  | WWYDActionType<typeof WWYDActions.DELETE_WWYD, number>