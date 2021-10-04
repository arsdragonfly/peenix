import { Grid } from "@material-ui/core";
import { Hand } from "../model/hand";
import TileBox from "./Tile";
import * as R from "ramda";

interface Props {
  hand: Hand;
}

const HandBox: React.FC<Props> = (props: Props) => {
  const { hand } = props;

  // Grid only allows 12 columns by default, we need more subdivisions
  return (
    <Grid container justify="space-around">
      {R.splitEvery(4, hand.tiles).map((quads, idx) => (
        <Grid item xs={12} md={3} key={idx}>
          <Grid container>
            {quads.map((t, idx) => (
              <Grid item xs={3} key={idx}>
                <TileBox tile={t} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default HandBox;
