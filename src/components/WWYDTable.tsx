// prettier-ignore
import { Checkbox, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { useSelector } from "react-redux";
import { useActions } from "../actions";
import * as WWYDActions from "../actions/WWYD";
import { WWYD } from "../model";
import { RootState } from "../reducers";
import TileBox from "./Tile"
import HandBox from "./Hand"

export function WWYDTable() {
	const classes = useStyles();
	const WWYDList = useSelector((state: RootState) => state.WWYDList);
	const WWYDActions_ = useActions(WWYDActions);

	return (
		<Paper className={classes.paper}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell padding="default">Hand</TableCell>
						<TableCell padding="default">Discard</TableCell>
						<TableCell padding="default">Delete</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{WWYDList.map((n: WWYD) => {
						return (
							<TableRow
								key={n.id}
								hover
							>
								<TableCell padding="none">
									<HandBox hand={n.hand} />
								</TableCell>
								<TableCell padding="none">
									<TileBox tile={n.discard} />
								</TableCell>
								<TableCell padding="none">
									<IconButton
										aria-label="Delete"
										color="default"
										onClick={() =>
											WWYDActions_.deleteWWYD(n.id)
										}
									>
										<DeleteIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</Paper>
	);
}

const useStyles = makeStyles({
	paper: {
		width: "100%",
		minWidth: 260,
		display: "inline-block",
	},
	table: {
		width: "100%",
	},
});
