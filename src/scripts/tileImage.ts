// Characters
import t1m from "../tile_images/Man1.png"
import t2m from "../tile_images/Man2.png"
import t3m from "../tile_images/Man3.png"
import t4m from "../tile_images/Man4.png"
import t5m from "../tile_images/Man5.png"
import t6m from "../tile_images/Man6.png"
import t7m from "../tile_images/Man7.png"
import t8m from "../tile_images/Man8.png"
import t9m from "../tile_images/Man9.png"

// Circles
import t1p from "../tile_images/Pin1.png"
import t2p from "../tile_images/Pin2.png"
import t3p from "../tile_images/Pin3.png"
import t4p from "../tile_images/Pin4.png"
import t5p from "../tile_images/Pin5.png"
import t6p from "../tile_images/Pin6.png"
import t7p from "../tile_images/Pin7.png"
import t8p from "../tile_images/Pin8.png"
import t9p from "../tile_images/Pin9.png"

// Bamboos
import t1s from "../tile_images/Sou1.png"
import t2s from "../tile_images/Sou2.png"
import t3s from "../tile_images/Sou3.png"
import t4s from "../tile_images/Sou4.png"
import t5s from "../tile_images/Sou5.png"
import t6s from "../tile_images/Sou6.png"
import t7s from "../tile_images/Sou7.png"
import t8s from "../tile_images/Sou8.png"
import t9s from "../tile_images/Sou9.png"

// Wind
import t1z from "../tile_images/Ton.png"
import t2z from "../tile_images/Nan.png"
import t3z from "../tile_images/Shaa.png"
import t4z from "../tile_images/Pei.png"

// Dragon
import t5z from "../tile_images/Haku.png"
import t6z from "../tile_images/Hatsu.png"
import t7z from "../tile_images/Chun.png"

// Red Fives
import t0m from "../tile_images/Man5-Dora.png"
import t0p from "../tile_images/Pin5-Dora.png"
import t0s from "../tile_images/Sou5-Dora.png"

import blank from "../tile_images/Blank.png"

import { Tile, TileVanilla } from "../model/tile"

const characterImages = [
    t1m,
    t2m,
    t3m,
    t4m,
    t5m,
    t6m,
    t7m,
    t8m,
    t9m,
]

const circleImages = [
    t1p,
    t2p,
    t3p,
    t4p,
    t5p,
    t6p,
    t7p,
    t8p,
    t9p,
]

const bambooImages = [
    t1s,
    t2s,
    t3s,
    t4s,
    t5s,
    t6s,
    t7s,
    t8s,
    t9s,
]

const windImages = {
    East: t1z,
    South: t2z,
    West: t3z,
    North: t4z,
}
const dragonImages = {
    White: t5z,
    Green: t6z,
    Red: t7z,
}

export function getTileVanillaImage(tile: TileVanilla) {
    switch (tile.suit) {
        case "Characters": return characterImages[tile.rank - 1]
        case "Circles": return circleImages[tile.rank - 1]
        case "Bamboos": return bambooImages[tile.rank - 1]
        case "Wind": return windImages[tile.rank]
        case "Dragon": return dragonImages[tile.rank]
    }
}

export function getTileImage(tile: Tile | undefined ) {
    if (tile === undefined) {
        return blank
    }
    if (tile.red) {
        if (tile.tile.suit === "Characters" && tile.tile.rank === 5) {
            return t0m
        }
        if (tile.tile.suit === "Circles" && tile.tile.rank === 5) {
            return t0p
        }
        if (tile.tile.suit === "Bamboos" && tile.tile.rank === 5) {
            return t0s
        }
    }
    return getTileVanillaImage(tile.tile)
}
