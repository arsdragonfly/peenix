import { IconButton, TableCell, TableRow, Box, Container, useMediaQuery } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { Theme } from "@material-ui/core/styles";
import * as React from "react";
import { WWYD } from "../model";
import TileBox from "./Tile"
import * as Tile from "./Tile"
import HandBox from "./Hand"
import { deleteWWYD } from "../features/WWYDList/WWYDListSlice"
import { useAppDispatch } from "../hooks"

interface Props {
    wwyd: WWYD,
}

function DiscardTileBox(props: Tile.Props) {
    const { tile } = props;
    const [displayTile, setDisplayTile] = React.useState<typeof tile>(undefined);

    const toggleDisplayTile = () => displayTile === undefined ? setDisplayTile(tile) : setDisplayTile(undefined)

    return (
        <Box onClick={toggleDisplayTile}>
            <TileBox tile={displayTile} />
        </Box>
    )

}


function WWYDComponent(props: Props) {
    const { wwyd } = props;
    const dispatch = useAppDispatch();
    const isMobile = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down("sm")
    );

    return (
        <TableRow
            key={wwyd.id}
            hover
        >
            <TableCell padding="default">
                <HandBox hand={wwyd.hand} />
            </TableCell>
            <TableCell padding="default">
                {isMobile ? (
                    <DiscardTileBox tile={wwyd.discard} />
                ) : (
                    <Container>
                        <DiscardTileBox tile={wwyd.discard} />
                    </Container>
                )}
            </TableCell>
            {!isMobile && (
                <TableCell padding="default">
                    <IconButton
                        aria-label="Delete"
                        color="default"
                        onClick={() =>
                            dispatch(deleteWWYD(wwyd.id))
                        }
                    >
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            )}
        </TableRow>
    );
}

export default WWYDComponent;