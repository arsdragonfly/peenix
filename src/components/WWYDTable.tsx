// prettier-ignore
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, useMediaQuery } from '@mui/material'
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { WWYD } from "../model";
import { useAppSelector } from "../hooks";
import { selectWWYDList } from "../features/WWYDList/WWYDListSlice";
import WWYDComponent from "./WWYDComponent";

export const WWYDTable: React.FC = () => {
  const classes = useStyles();
  const WWYDList = useAppSelector(selectWWYDList);
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md')
  );

  return (
    <Paper className={classes.paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell padding="normal">Hand</TableCell>
            <TableCell padding="normal">Discard</TableCell>
            {!isMobile && <TableCell padding="normal">Delete</TableCell>}
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
