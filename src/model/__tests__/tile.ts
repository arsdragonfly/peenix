import { parseTile, parseTiles, TileSuit, TileWind, TileDragon } from "../tile";

it("parses a single tile correctly", () => {
  expect(parseTile("1m")).toEqual({
    tile: { suit: TileSuit.Characters, rank: 1 },
    red: false
  });
  expect(parseTile("0p")).toEqual({
    tile: { suit: TileSuit.Circles, rank: 5 },
    red: true
  });
  expect(parseTile("2z")).toEqual({
    tile: { suit: TileSuit.Wind, rank: TileWind.South },
    red: false
  });
  expect(parseTile("7z")).toEqual({
    tile: { suit: TileSuit.Dragon, rank: TileDragon.Red },
    red: false
  });
});

it("parses tiles correctly", () => {
  expect(parseTiles("79m13689p4559s12z6p")).toEqual([
    { tile: { suit: TileSuit.Characters, rank: 7 }, red: false },
    { tile: { suit: TileSuit.Characters, rank: 9 }, red: false },
    { tile: { suit: TileSuit.Circles, rank: 1 }, red: false },
    { tile: { suit: TileSuit.Circles, rank: 3 }, red: false },
    { tile: { suit: TileSuit.Circles, rank: 6 }, red: false },
    { tile: { suit: TileSuit.Circles, rank: 8 }, red: false },
    { tile: { suit: TileSuit.Circles, rank: 9 }, red: false },
    { tile: { suit: TileSuit.Bamboos, rank: 4 }, red: false },
    { tile: { suit: TileSuit.Bamboos, rank: 5 }, red: false },
    { tile: { suit: TileSuit.Bamboos, rank: 5 }, red: false },
    { tile: { suit: TileSuit.Bamboos, rank: 9 }, red: false },
    { tile: { suit: TileSuit.Wind, rank: TileWind.East }, red: false },
    { tile: { suit: TileSuit.Wind, rank: TileWind.South }, red: false },
    { tile: { suit: TileSuit.Circles, rank: 6 }, red: false }
  ]);
});
