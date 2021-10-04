import { Hand } from "./hand";
import { Tile } from "./tile";

export interface WWYD {
  id: string;
  hand: Hand;
  discard: Tile;
}
