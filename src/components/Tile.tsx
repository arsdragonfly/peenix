import { makeStyles } from '@material-ui/core';
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
        <div className={classes.root}>
            <img src={getTileImage(tile)} alt=""/>
        </div>
    );
}

const useStyles = makeStyles({
    root: {
        width: "100%",
    }
});

export default TileBox;