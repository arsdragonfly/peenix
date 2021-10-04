// prettier-ignore
import { Button, Dialog, DialogActions, DialogTitle, TextField } from '@material-ui/core'
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { addWWYD } from "../features/WWYDList/WWYDListSlice";
import { useAppDispatch } from "../hooks";
import { parseTiles, parseTile } from "../model/tile";
import { v4 as uuidv4 } from "uuid";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const WWYDDialog: React.FC<Props> = (props: Props) => {
  const { open, onClose } = props;
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [newHandText, setNewHandText] = React.useState("");
  const [newDiscardText, setNewDiscardText] = React.useState("");

  const handleClose = (): void => {
    dispatch(
      addWWYD({
        id: uuidv4(),
        hand: { tiles: parseTiles(newHandText) },
        discard: parseTile(newDiscardText) ?? {
          tile: { suit: "Characters", rank: 3 },
          red: false
        }
      })
    );
    onClose();

    // reset texts if user reopens the dialog
    setNewHandText("");
    setNewDiscardText("");
  };

  const handleHandTextChange = (event: any): void => {
    setNewHandText(event.target.value);
  };

  const handleDiscardTextChange = (event: any): void => {
    setNewDiscardText(event.target.value);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add a new WWYD</DialogTitle>
      <TextField
        id="multiline-flexible"
        multiline
        value={newHandText}
        onChange={handleHandTextChange}
        className={classes.textField}
        label="Hand"
        placeholder="e.g. 23367m067p112233s"
      />
      <TextField
        id="multiline-flexible"
        multiline
        value={newDiscardText}
        onChange={handleDiscardTextChange}
        className={classes.textField}
        label="Discard"
        placeholder="e.g. 3m"
      />
      <DialogActions>
        <Button color="primary" onClick={handleClose}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const useStyles = makeStyles({
  textField: {
    width: "80%",
    margin: 20
  }
});
