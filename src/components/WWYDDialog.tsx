// prettier-ignore
import { Button, Dialog, DialogActions, DialogTitle, TextField } from '@mui/material'
import { makeStyles } from "@mui/styles";
import * as React from "react";
import { addWWYD } from "../features/WWYDList/WWYDListSlice";
import { useAppDispatch } from "../hooks";
import { parseTiles, parseTile, TileSuit } from "../model/tile";
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

  const resetText = (): void => {
    setNewHandText("");
    setNewDiscardText("");
  };

  const addWWYDEntry = (): void => {
    dispatch(
      addWWYD({
        id: uuidv4(),
        hand: { tiles: parseTiles(newHandText) },
        discard: parseTile(newDiscardText) ?? {
          tile: { suit: TileSuit.Characters, rank: 3 },
          red: false
        }
      })
    );
  };

  const handleHandTextChange = (event: any): void => {
    setNewHandText(event.target.value);
  };

  const handleDiscardTextChange = (event: any): void => {
    setNewDiscardText(event.target.value);
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        resetText();
        onClose();
      }}
    >
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
        <Button
          color="primary"
          onClick={() => {
            resetText();
            onClose();
          }}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={() => {
            addWWYDEntry();
            resetText();
            onClose();
          }}
        >
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
