import {
  Tile,
  applyRed,
  nextTile,
  nextNextTile,
  prevTile,
  prevPrevTile,
  TileVanilla
} from "./tile";

// types for meld rendering
interface MeldDisplayElementType<O, T> {
  orientation: O;
  tile: T;
}

export enum MeldDisplayOrientation {
  Vertical = "Vertical",
  VerticalFlipped = "VerticalFlipped", // only used for closed kan
  Horizontal = "Horizontal",
  Stacked = "Stacked" // bottom tile comes first; only used for added kan
}

type MeldDisplayElement =
  | MeldDisplayElementType<MeldDisplayOrientation.Vertical, Tile>
  | MeldDisplayElementType<MeldDisplayOrientation.VerticalFlipped, Tile>
  | MeldDisplayElementType<MeldDisplayOrientation.Horizontal, Tile>
  | MeldDisplayElementType<MeldDisplayOrientation.Stacked, [Tile, Tile]>;

type MeldDisplay = MeldDisplayElement[];

// types for the internal representation of melds
export enum MeldType {
  Chii = "Chii",
  Pon = "Pon",
  ClosedKan = "ClosedKan",
  OpenKan = "OpenKan",
  AddedKan = "AddedKan"
}

// https://blog.kobalab.net/entry/20170228/1488294993
export enum MeldSource {
  Self = 0,
  Shimocha,
  Toimen,
  Kamicha
}

export interface Meld {
  type: MeldType;
  tile: Tile;
  meldDisplay: MeldDisplay;
  meldSource: MeldSource;
}

type ChiiPattern = "Left" | "Middle" | "Right";

interface ChiiProps {
  tile: Tile;
  pattern: ChiiPattern;
  red: boolean; // only applicable to the two tiles used to make the call
}

export const chii = ({ tile, pattern, red }: ChiiProps): Meld => {
  const meldedTileDisplay: MeldDisplayElement = {
    orientation: MeldDisplayOrientation.Horizontal,
    tile: tile
  };

  const meldingTileDisplay = (tile: TileVanilla): MeldDisplayElement => {
    return {
      orientation: MeldDisplayOrientation.Vertical,
      tile: applyRed(red)(tile)
    };
  };

  const meldDisplay: MeldDisplay = ((): MeldDisplay => {
    switch (pattern) {
      case "Left":
        return [
          meldedTileDisplay,
          meldingTileDisplay(nextTile(tile.tile)),
          meldingTileDisplay(nextNextTile(tile.tile))
        ];
      case "Middle":
        return [
          meldingTileDisplay(prevTile(tile.tile)),
          meldedTileDisplay,
          meldingTileDisplay(nextTile(tile.tile))
        ];
      case "Right":
        return [
          meldingTileDisplay(prevPrevTile(tile.tile)),
          meldingTileDisplay(prevTile(tile.tile)),
          meldedTileDisplay
        ];
    }
  })();

  return {
    type: MeldType.Chii,
    tile,
    meldDisplay,
    meldSource: MeldSource.Kamicha
  };
};

interface PonProps {
  tile: Tile;
  meldSource: MeldSource.Shimocha | MeldSource.Toimen | MeldSource.Kamicha;
  red: boolean; // only applicable to the two tiles used to make the call
}

export const pon = ({ tile, meldSource, red }: PonProps): Meld => {
  const meldedTileDisplay: MeldDisplayElement = {
    orientation: MeldDisplayOrientation.Horizontal,
    tile: tile
  };
  const meldingTileDisplay: [MeldDisplayElement, MeldDisplayElement] = [
    {
      orientation: MeldDisplayOrientation.Vertical,
      tile: applyRed(red)(tile.tile)
    },
    {
      orientation: MeldDisplayOrientation.Vertical,
      tile: {
        tile: tile.tile,
        red: false
      }
    }
  ];
  const meldDisplay: MeldDisplay = ((): MeldDisplay => {
    switch (meldSource) {
      case MeldSource.Shimocha:
        return [...meldingTileDisplay, meldedTileDisplay];
      case MeldSource.Toimen:
        return [
          meldingTileDisplay[0],
          meldedTileDisplay,
          meldingTileDisplay[1]
        ];
      case MeldSource.Kamicha:
        return [meldedTileDisplay, ...meldingTileDisplay];
    }
  })();
  return {
    type: MeldType.Pon,
    tile,
    meldDisplay,
    meldSource
  };
};

interface ClosedKanProps {
  tile: Tile;
}

export const closedKan = ({ tile }: ClosedKanProps): Meld => {
  const meldDisplay: MeldDisplay = [
    {
      orientation: MeldDisplayOrientation.VerticalFlipped,
      tile: {
        tile: tile.tile,
        red: false
      }
    },
    {
      orientation: MeldDisplayOrientation.Vertical,
      tile
    },
    {
      orientation: MeldDisplayOrientation.Vertical,
      tile: {
        tile: tile.tile,
        red: !tile.red
      }
    },
    {
      orientation: MeldDisplayOrientation.VerticalFlipped,
      tile: {
        tile: tile.tile,
        red: false
      }
    }
  ];
  return {
    type: MeldType.ClosedKan,
    tile,
    meldDisplay,
    meldSource: MeldSource.Self
  };
};

interface OpenKanProps {
  tile: Tile;
  meldSource: MeldSource.Shimocha | MeldSource.Toimen | MeldSource.Kamicha;
}

export const openKan = ({ tile, meldSource }: OpenKanProps): Meld => {
  const meldedTileDisplay: MeldDisplayElement = {
    orientation: MeldDisplayOrientation.Horizontal,
    tile: tile
  };
  const meldingTileDisplay: [
    MeldDisplayElement,
    MeldDisplayElement,
    MeldDisplayElement
  ] = [
    {
      orientation: MeldDisplayOrientation.Vertical,
      tile: applyRed(!tile.red)(tile.tile)
    },
    {
      orientation: MeldDisplayOrientation.Vertical,
      tile: {
        tile: tile.tile,
        red: false
      }
    },
    {
      orientation: MeldDisplayOrientation.Vertical,
      tile: {
        tile: tile.tile,
        red: false
      }
    }
  ];
  const meldDisplay: MeldDisplay = ((): MeldDisplay => {
    switch (meldSource) {
      case MeldSource.Shimocha:
        return [...meldingTileDisplay, meldedTileDisplay];
      case MeldSource.Toimen:
        return [
          meldingTileDisplay[0],
          meldedTileDisplay,
          meldingTileDisplay[1],
          meldingTileDisplay[2]
        ];
      case MeldSource.Kamicha:
        return [meldedTileDisplay, ...meldingTileDisplay];
    }
  })();
  return {
    type: MeldType.OpenKan,
    tile,
    meldDisplay,
    meldSource
  };
};

interface AddedKanProps {
  tile: Tile;
  pon: PonProps;
}

export const addedKan = ({ tile, pon }: AddedKanProps): Meld => {
  const meldedTileDisplay: MeldDisplayElement = {
    orientation: MeldDisplayOrientation.Stacked,
    tile: [pon.tile, tile]
  };
  const meldingTileDisplay: [MeldDisplayElement, MeldDisplayElement] = [
    {
      orientation: MeldDisplayOrientation.Vertical,
      tile: applyRed(!(tile.red || pon.tile.red))(tile.tile)
    },
    {
      orientation: MeldDisplayOrientation.Vertical,
      tile: {
        tile: tile.tile,
        red: false
      }
    }
  ];
  const meldDisplay: MeldDisplay = ((): MeldDisplay => {
    switch (pon.meldSource) {
      case MeldSource.Shimocha:
        return [...meldingTileDisplay, meldedTileDisplay];
      case MeldSource.Toimen:
        return [
          meldingTileDisplay[0],
          meldedTileDisplay,
          meldingTileDisplay[1]
        ];
      case MeldSource.Kamicha:
        return [meldedTileDisplay, ...meldingTileDisplay];
    }
  })();
  return {
    type: MeldType.AddedKan,
    tile,
    meldDisplay,
    meldSource: MeldSource.Self
  };
};
