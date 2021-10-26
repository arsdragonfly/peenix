import { Tile } from "./tile";
import { Meld } from "./meld"

export interface Hand {
  melds: Meld[];
  tiles: Tile[]; // closed tiles only
}
