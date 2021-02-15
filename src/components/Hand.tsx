// prettier-ignore
import { makeStyles, Grid } from '@material-ui/core';
import * as React from 'react';
import { Hand } from '../model/hand';
import TileBox from './Tile';
import * as R from 'ramda';

interface Props {
    hand: Hand
}

function HandBox(props: Props) {

    const { hand } = props;
    const classes = useStyles(props);

    // Grid only allows 12 columns by default, we need more subdivisions
    return (
        <Grid container className={classes.container}>
            {R.splitEvery(4, hand.tiles).map((quads) =>
                (
                    <Grid item xs={3}>
                        <Grid container>
                            {quads.map((t) => (
                                <Grid item xs={3}>
                                    <TileBox tile={t} />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                )
            )}
        </Grid>
    )
}

const useStyles = makeStyles({
    container: {
        height: "100%",
    }
});

export default HandBox;