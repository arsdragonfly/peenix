import {
  IconButton,
  TableCell,
  TableRow,
  Box,
  Container,
  useMediaQuery
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Theme } from "@mui/material/styles";
import * as React from "react";
import { WWYD } from "../model";
import TileBox from "./Tile";
import * as Tile from "./Tile";
import HandBox from "./Hand";
import { deleteWWYD } from "../features/WWYDList/WWYDListSlice";
import { useAppDispatch } from "../hooks";

interface Props {
  wwyd: WWYD;
}

const DiscardTileBox: React.FC<Tile.Props> = (props: Tile.Props) => {
  const { tile } = props;
  const [displayTile, setDisplayTile] = React.useState<typeof tile>(undefined);

  const toggleDisplayTile = (): void => {
    if (displayTile === undefined) {
      setDisplayTile(tile);
    } else {
      setDisplayTile(undefined);
    }
  };

  return (
    <Box onClick={toggleDisplayTile}>
      <TileBox tile={displayTile} />
    </Box>
  );
};

const WWYDComponent: React.FC<Props> = (props: Props) => {
  const { wwyd } = props;
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md')
  );

  return (
    <TableRow key={wwyd.id} hover>
      <TableCell padding="normal">
        <HandBox hand={wwyd.hand} />
      </TableCell>
      <TableCell padding="normal">
        {isMobile ? (
          <DiscardTileBox tile={wwyd.discard} />
        ) : (
          <Container>
            <DiscardTileBox tile={wwyd.discard} />
          </Container>
        )}
      </TableCell>
      {!isMobile && (
        <TableCell padding="normal">
          <IconButton
            aria-label="Delete"
            color="default"
            onClick={() => dispatch(deleteWWYD(wwyd.id))}
            size="large">
            <DeleteIcon />
          </IconButton>
        </TableCell>
      )}
    </TableRow>
  );
};

export default WWYDComponent;
