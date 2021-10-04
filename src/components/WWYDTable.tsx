// prettier-ignore
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, useMediaQuery } from '@material-ui/core'
import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import { WWYD } from "../model";
import { useAppSelector } from "../hooks";
import { selectWWYDList } from "../features/WWYDList/WWYDListSlice";
import WWYDComponent from "./WWYDComponent";

export const WWYDTable: React.FC = () => {
  const classes = useStyles();
  const WWYDList = useAppSelector(selectWWYDList);
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  return (
    <Paper className={classes.paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell padding="default">Hand</TableCell>
            <TableCell padding="default">Discard</TableCell>
            {!isMobile && <TableCell padding="default">Delete</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {WWYDList.map((n: WWYD, idx) => {
            return <WWYDComponent wwyd={n} key={idx} />;
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

const useStyles = makeStyles({
  paper: {
    width: "100%",
    minWidth: 260,
    display: "inline-block"
  },
  table: {
    width: "100%"
  }
});
