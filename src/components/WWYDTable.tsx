// prettier-ignore
import { Box, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
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
import * as Tile from "./Tile"

function DiscardTileBox(props: Tile.Props) {
	const { tile } = props;
	const [ displayTile, setDisplayTile ] = React.useState<typeof tile>(undefined);

	const toggleDisplayTile = () => displayTile === undefined ? setDisplayTile(tile) : setDisplayTile(undefined)

	return (
		<Box onClick={toggleDisplayTile}>
			<TileBox tile={displayTile} />
		</Box>
	)

}

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
								<TableCell padding="default">
									<HandBox hand={n.hand} />
								</TableCell>
								<TableCell padding="default">
									<DiscardTileBox tile={n.discard} />
								</TableCell>
								<TableCell padding="default">
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
