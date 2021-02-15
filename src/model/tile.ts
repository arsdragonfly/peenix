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

export function tileToReprNum(t: Tile): string {
    // find the tile's corresponding number a-la tenhou pairi.
    const tileNum = (rank: TileRank, red: boolean) => (red && rank == 5) ? 0 : rank;
    switch (t.tile.suit) {
        case "Wind": switch (t.tile.rank) {
            case "East": return "1";
            case "South": return "2";
            case "West": return "3";
            case "North": return "4";
        }
        case "Dragon": switch (t.tile.rank) {
            case "White": return "5";
            case "Green": return "6";
            case "Red": return "7";
        }
        default: return `${tileNum(t.tile.rank, t.red)}`;
    }
}

export function tileToReprChar(t: Tile): string {
    // find the tile's corresponding character a-la tenhou pairi.
    const chars = {
        "Characters": "m",
        "Circles": "p",
        "Bamboos": "s",
        "Wind": "z",
        "Dragon": "z",
    }
    return chars[t.tile.suit]
}

export function parseTile(s: string): Tile | undefined {
    if (s[1] == "z") {
        const tileVanillaMap: { [key: string]: TileVanilla } = {
            "1": { suit: "Wind", rank: "East" },
            "2": { suit: "Wind", rank: "South" },
            "3": { suit: "Wind", rank: "West" },
            "4": { suit: "Wind", rank: "North" },
            "5": { suit: "Dragon", rank: "White" },
            "6": { suit: "Dragon", rank: "Green" },
            "7": { suit: "Dragon", rank: "Red" },
        }
        const t: TileVanilla | undefined = tileVanillaMap[s[0]]
        if (t) {
            return { tile: t, red: false }
        }
    } else {
        const suitMap: { [key: string]: "Characters" | "Circles" | "Bamboos" } = {
            "m": "Characters",
            "p": "Circles",
            "s": "Bamboos",
        }
        const suit: "Characters" | "Circles" | "Bamboos" | undefined = suitMap[s[1]]
        if (suit) {
            if (s[0] == "0") {
                return { tile: { suit, rank: 5 }, red: true }
            }
            else {
                const rankMap: { [key: string]: TileRank } = {
                    "1": 1,
                    "2": 2,
                    "3": 3,
                    "4": 4,
                    "5": 5,
                    "6": 6,
                    "7": 7,
                    "8": 8,
                    "9": 9,
                }
                const rank: TileRank | undefined = rankMap[s[0]]
                if (rank) {
                    const t: TileType<"Characters", TileRank> | TileType<"Circles", TileRank> | TileType<"Bamboos", TileRank> = {
                        suit,
                        rank,
                    }
                    return { tile: t, red: false }
                }
            }
        }
    }
    return undefined;
}