import { IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
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

interface Props {
    wwyd: WWYD,
}

function WWYDComponent(props: Props) {
    const { wwyd } = props;
	const WWYDActions_ = useActions(WWYDActions);

    return (
        <TableRow
            key={wwyd.id}
            hover
        >
            <TableCell padding="default">
                <HandBox hand={wwyd.hand} />
            </TableCell>
            <TableCell padding="default">
                <TileBox tile={wwyd.discard} />
            </TableCell>
            <TableCell padding="default">
                <IconButton
                    aria-label="Delete"
                    color="default"
                    onClick={() =>
                        WWYDActions_.deleteWWYD(wwyd.id)
                    }
                >
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
}

export default WWYDComponent;