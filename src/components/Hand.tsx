// prettier-ignore
import { Grid } from '@material-ui/core';
import { Hand } from '../model/hand';
import TileBox from './Tile';
import * as R from 'ramda';

interface Props {
    hand: Hand
}

function HandBox(props: Props) {

    const { hand } = props;

    // Grid only allows 12 columns by default, we need more subdivisions
    return (
        <Grid container justify="space-around"> {R.splitEvery(4, hand.tiles).map((quads) =>
        (
            <Grid item xs={12} md={3}>
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

export default HandBox;