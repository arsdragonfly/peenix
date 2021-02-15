import { parseTile, parseTiles } from "../tile"

it('parses a single tile correctly', () => {
    expect(parseTile("1m")).toEqual({ tile: { suit: "Characters", rank: 1 }, red: false })
    expect(parseTile("0p")).toEqual({ tile: { suit: "Circles", rank: 5 }, red: true })
    expect(parseTile("2z")).toEqual({ tile: { suit: "Wind", rank: "South" }, red: false })
    expect(parseTile("7z")).toEqual({ tile: { suit: "Dragon", rank: "Red" }, red: false })
})

it('parses tiles correctly', () => {
    expect(parseTiles("79m13689p4559s12z6p")).toEqual(
        [
            { tile: { suit: "Characters", rank: 7 }, red: false },
            { tile: { suit: "Characters", rank: 9 }, red: false },
            { tile: { suit: "Circles", rank: 1 }, red: false },
            { tile: { suit: "Circles", rank: 3 }, red: false },
            { tile: { suit: "Circles", rank: 6 }, red: false },
            { tile: { suit: "Circles", rank: 8 }, red: false },
            { tile: { suit: "Circles", rank: 9 }, red: false },
            { tile: { suit: "Bamboos", rank: 4 }, red: false },
            { tile: { suit: "Bamboos", rank: 5 }, red: false },
            { tile: { suit: "Bamboos", rank: 5 }, red: false },
            { tile: { suit: "Bamboos", rank: 9 }, red: false },
            { tile: { suit: "Wind", rank: "East" }, red: false },
            { tile: { suit: "Wind", rank: "South" }, red: false },
            { tile: { suit: "Circles", rank: 6 }, red: false },
        ]
    )
})