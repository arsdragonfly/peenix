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

export function tileToText(t: Tile): string {
    const tileNum = (rank: TileRank, red: boolean) => (red && rank == 5) ? 0 : rank;
    switch (t.tile.suit) {
        case "Characters": return `${tileNum(t.tile.rank, t.red)}m`;
        case "Circles": return `${tileNum(t.tile.rank, t.red)}p`;
        case "Bamboos": return `${tileNum(t.tile.rank, t.red)}s`;
        case "Wind": switch (t.tile.rank) {
            case "East": return "1z";
            case "South": return "2z";
            case "West": return "3z";
            case "North": return "4z";
        }
        case "Dragon": switch (t.tile.rank) {
            case "White": return "5z";
            case "Green": return "6z";
            case "Red": return "7z";
        }
    }
}

