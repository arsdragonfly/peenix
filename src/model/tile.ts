import * as R from "ramda";

export enum TileSuit {
  Characters = "Characters",
  Circles = "Circles",
  Bamboos = "Bamboos",
  Wind = "Wind",
  Dragon = "Dragon"
}

export type TileRank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export enum TileWind {
  East = 1,
  South,
  West,
  North
}

export enum TileDragon {
  White = 5,
  Green,
  Red
}

interface TileType<S, R> {
  suit: S;
  rank: R;
}

export type TileVanilla =
  | TileType<TileSuit.Characters, TileRank>
  | TileType<TileSuit.Circles, TileRank>
  | TileType<TileSuit.Bamboos, TileRank>
  | TileType<TileSuit.Wind, TileWind>
  | TileType<TileSuit.Dragon, TileDragon>;

export interface Tile {
  tile: TileVanilla;
  red: boolean;
}

export function tileToReprNum(t: Tile): string {
  // find the tile's corresponding number a-la tenhou pairi.
  const tileNum = (rank: TileRank, red: boolean): number =>
    red && rank === 5 ? 0 : rank;
  switch (t.tile.suit) {
    case TileSuit.Wind:
      return String(t.tile.rank);
    case TileSuit.Dragon:
      return String(t.tile.rank);
    // eslint-disable-next-line
    default:
      return `${tileNum(t.tile.rank, t.red)}`;
  }
}

export function tileToReprChar(t: Tile): string {
  // find the tile's corresponding character a-la tenhou pairi.
  const chars: { [key in TileSuit]: string } = {
    [TileSuit.Characters]: "m",
    [TileSuit.Circles]: "p",
    [TileSuit.Bamboos]: "s",
    [TileSuit.Wind]: "z",
    [TileSuit.Dragon]: "z"
  };
  return chars[t.tile.suit];
}

export function parseTile(s: string): Tile | undefined {
  // parse a single tile, e.g. "1s"
  if (s[1] === "z") {
    const tileVanillaMap: { [key: string]: TileVanilla } = {
      1: { suit: TileSuit.Wind, rank: TileWind.East },
      2: { suit: TileSuit.Wind, rank: TileWind.South },
      3: { suit: TileSuit.Wind, rank: TileWind.West },
      4: { suit: TileSuit.Wind, rank: TileWind.North },
      5: { suit: TileSuit.Dragon, rank: TileDragon.White },
      6: { suit: TileSuit.Dragon, rank: TileDragon.Green },
      7: { suit: TileSuit.Dragon, rank: TileDragon.Red }
    };
    const t: TileVanilla | undefined = tileVanillaMap[s[0]];
    if (t !== undefined) {
      return { tile: t, red: false };
    }
  } else {
    const suitMap: {
      [key: string]: TileSuit.Characters | TileSuit.Circles | TileSuit.Bamboos;
    } = {
      m: TileSuit.Characters,
      p: TileSuit.Circles,
      s: TileSuit.Bamboos
    };
    const suit:
      | TileSuit.Characters
      | TileSuit.Circles
      | TileSuit.Bamboos
      | undefined = suitMap[s[1]];
    if (suit !== undefined) {
      if (s[0] === "0") {
        return { tile: { suit, rank: 5 }, red: true };
      } else {
        const rankMap: { [key: string]: TileRank } = {
          1: 1,
          2: 2,
          3: 3,
          4: 4,
          5: 5,
          6: 6,
          7: 7,
          8: 8,
          9: 9
        };
        const rank: TileRank | undefined = rankMap[s[0]];
        if (rank !== undefined) {
          const t:
            | TileType<TileSuit.Characters, TileRank>
            | TileType<TileSuit.Circles, TileRank>
            | TileType<TileSuit.Bamboos, TileRank> = {
            suit,
            rank
          };
          return { tile: t, red: false };
        }
      }
    }
  }
  return undefined;
}

export function parseTiles(s: string): Tile[] {
  let tiles: Tile[] = [];
  let ranks: string[] = [];
  const parseRanks = (c: string): Tile[] =>
    R.map((r) => parseTile(`${r}${c}`), ranks).flatMap((f) =>
      typeof f !== "undefined" ? [f] : []
    );
  for (const c of s) {
    if (["m", "p", "s", "z"].includes(c)) {
      tiles = tiles.concat(parseRanks(c));
      ranks = [];
    } else {
      ranks.push(c);
    }
  }
  return tiles;
}

export const applyRed =
  (red: boolean) =>
  (tile: TileVanilla): Tile => {
    if (
      tile.suit === TileSuit.Characters ||
      tile.suit === TileSuit.Circles ||
      tile.suit === TileSuit.Bamboos
    ) {
      if (red && tile.rank === 5) {
        return {
          tile: tile,
          red: true
        };
      }
    }
    return {
      tile: tile,
      red: false
    };
  };

const nextTileRank: { [key in TileRank]: TileRank } = {
  1: 2,
  2: 3,
  3: 4,
  4: 5,
  5: 6,
  6: 7,
  7: 8,
  8: 9,
  9: 1
};

const nextNextTileRank: { [key in TileRank]: TileRank } = {
  1: 3,
  2: 4,
  3: 5,
  4: 6,
  5: 7,
  6: 8,
  7: 9,
  8: 1,
  9: 2
};

const prevTileRank: { [key in TileRank]: TileRank } = {
  1: 9,
  2: 1,
  3: 2,
  4: 3,
  5: 4,
  6: 5,
  7: 6,
  8: 7,
  9: 8
};

const prevPrevTileRank: { [key in TileRank]: TileRank } = {
  1: 8,
  2: 9,
  3: 1,
  4: 2,
  5: 3,
  6: 4,
  7: 5,
  8: 6,
  9: 7
};

const nextTileWind: { [key in TileWind]: TileWind } = {
  [TileWind.East]: TileWind.South,
  [TileWind.South]: TileWind.West,
  [TileWind.West]: TileWind.North,
  [TileWind.North]: TileWind.East
};

const nextNextTileWind: { [key in TileWind]: TileWind } = {
  [TileWind.East]: TileWind.West,
  [TileWind.South]: TileWind.North,
  [TileWind.West]: TileWind.East,
  [TileWind.North]: TileWind.South
};

const prevTileWind: { [key in TileWind]: TileWind } = {
  [TileWind.East]: TileWind.North,
  [TileWind.South]: TileWind.East,
  [TileWind.West]: TileWind.South,
  [TileWind.North]: TileWind.West
};

const prevPrevTileWind = nextNextTileWind;

const nextTileDragon: { [key in TileDragon]: TileDragon } = {
  [TileDragon.White]: TileDragon.Green,
  [TileDragon.Green]: TileDragon.Red,
  [TileDragon.Red]: TileDragon.White
};

const prevTileDragon: { [key in TileDragon]: TileDragon } = {
  [TileDragon.White]: TileDragon.Red,
  [TileDragon.Green]: TileDragon.White,
  [TileDragon.Red]: TileDragon.Green
};

const nextNextTileDragon = nextTileDragon;

const prevPrevTileDragon = prevTileDragon;

const transformTile =
  (
    numberTileTransformer: { [key in TileRank]: TileRank },
    windTileTransformer: { [key in TileWind]: TileWind },
    dragonTileTransformer: { [key in TileDragon]: TileDragon }
  ) =>
  (tile: TileVanilla): TileVanilla => {
    if (
      tile.suit === TileSuit.Characters ||
      tile.suit === TileSuit.Circles ||
      tile.suit === TileSuit.Bamboos
    ) {
      return {
        ...tile,
        rank: numberTileTransformer[tile.rank]
      };
    } else if (tile.suit === TileSuit.Wind) {
      return {
        ...tile,
        rank: windTileTransformer[tile.rank]
      };
    } else {
      return {
        ...tile,
        rank: dragonTileTransformer[tile.rank]
      };
    }
  };

export const nextTile = transformTile(
  nextTileRank,
  nextTileWind,
  nextTileDragon
);
export const nextNextTile = transformTile(
  nextNextTileRank,
  nextNextTileWind,
  nextNextTileDragon
);
export const prevTile = transformTile(
  prevTileRank,
  prevTileWind,
  prevTileDragon
);
export const prevPrevTile = transformTile(
  prevPrevTileRank,
  prevPrevTileWind,
  prevPrevTileDragon
);
