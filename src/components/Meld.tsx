import { Meld, MeldDisplayOrientation } from "../model/meld"
import TileBox from "./Tile";

interface Props {
    meld: Meld;
}

export const MeldComponent: React.FC<Props> = (props: Props) => {
    const { meld } = props;
    // const { type, tile, meldDisplay, meldSource } = meld;
    const { meldDisplay } = meld;
    const tiles = [];
    for (const element of meldDisplay) {
        switch (element.orientation) {
            case MeldDisplayOrientation.Vertical:
                tiles.push(element.tile);
                break;
            case MeldDisplayOrientation.VerticalFlipped:
                tiles.push(element.tile);
                break;
            case MeldDisplayOrientation.Horizontal:
                tiles.push(element.tile);
                break;
            case MeldDisplayOrientation.Stacked:
                tiles.push(element.tile[0], element.tile[1]);
                break;
        }
    }
    return (
        <div className="meld">
            {tiles.map((tile, index) => {
                return <TileBox key={index} tile={tile} />
            })}
        </div>
    );
}