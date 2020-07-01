export enum TileSuit {
    Characters,
    Circles,
    Bamboos,
    Wind,
    Dragon,
}

export type TileRank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type TileWind = "East" | "South" | "West" | "North"

export type TileDragon = "White" | "Green" | "Red"

interface TileType<S, R> {
    suit: S;
    rank: R;
}

export type Tile = 
    | TileType<typeof TileSuit.Characters, TileRank>
    | TileType<typeof TileSuit.Circles, TileRank>
    | TileType<typeof TileSuit.Bamboos, TileRank>
    | TileType<typeof TileSuit.Wind, TileWind>
    | TileType<typeof TileSuit.Dragon, TileDragon>

export interface Tile2 {
    tile: Tile,
    red: boolean,
}