export type TileSuit = "Characters" | "Circles" | "Bamboos" | "Wind" | "Dragon"

export type TileRank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type TileWind = "East" | "South" | "West" | "North"

export type TileDragon = "White" | "Green" | "Red"

type TileType<S, R> = {
    suit: S;
    rank: R;
}

export type TileVanilla =
    | TileType<"Characters", TileRank>
    | TileType<"Circles", TileRank>
    | TileType<"Bamboos", TileRank>
    | TileType<"Wind", TileWind>
    | TileType<"Dragon", TileDragon>

export interface Tile {
    tile: TileVanilla,
    red: boolean,
}