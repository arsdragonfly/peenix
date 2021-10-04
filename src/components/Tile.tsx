import { Box } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { getTileImage } from "../scripts/tileImage";
import { Tile } from "../model/tile";

export interface Props {
  tile: Tile | undefined;
}

const TileBox: React.FC<Props> = (props: Props) => {
  const { tile } = props;

  const classes = useStyles(props);

  return (
    <Box height="100%">
      <img className={classes.img} src={getTileImage(tile)} alt="" />
    </Box>
  );
};

const useStyles = makeStyles({
  img: {
    verticalAlign: "middle",
    maxWidth: "100%",
    width: "auto"
  }
});

export default TileBox;
