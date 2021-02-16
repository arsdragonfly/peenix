import { makeStyles, Box } from '@material-ui/core';
import * as React from 'react';
import { getTileImage } from '../scripts/tileImage';
import { Tile } from '../model/tile';

interface Props {
    tile: Tile
}

function TileBox(props: Props) {

    const { tile } = props;

    const classes = useStyles(props);

    return (
        <Box height="100%">
            <img className={classes.img} src={getTileImage(tile)} alt="" />
        </Box>
    );
}

const useStyles = makeStyles({
    img: {
        verticalAlign: "middle",
        maxWidth: "100%",
        width: "auto"
    }
});

export default TileBox;