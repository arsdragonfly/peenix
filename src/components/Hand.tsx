// prettier-ignore
import { makeStyles, Grid } from '@material-ui/core';
import * as React from 'react';
import { Hand } from '../model/hand';
import TileBox from './Tile';

interface Props {
    hand: Hand
}

function HandBox(props: Props) {

    const { hand } = props;
    const classes = useStyles(props);

    return (
        <Grid container>
            {hand.tiles.map((t) =>
                <Grid item>
                    <TileBox tile={t} />
                </Grid>)}
        </Grid>
    );
}

const useStyles = makeStyles({
    root: {}
});

export default HandBox;