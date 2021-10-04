import { Button, Grid, Typography } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import * as React from "react";
import { WWYDDialog, WWYDTable } from "../components";

export const WWYDPage: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleAddWWYD = (): void => {
    setOpen(true);
  };

  return (
    <Grid container className={classes.root}>
      <WWYDDialog open={open} onClose={handleClose} />
      <Grid item xs={6}>
        <Typography variant="h4" gutterBottom>
          WWYD List
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <div className={classes.buttonContainer}>
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            onClick={handleAddWWYD}
          >
            Add WWYD
          </Button>
        </div>
      </Grid>
      <Grid item xs={12}>
        <WWYDTable />
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: 20,
    [theme.breakpoints.down('lg')]: {
      paddingTop: 50,
      paddingLeft: 15,
      paddingRight: 15
    }
  },

  buttonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end"
  },

  button: {
    marginBottom: 15
  }
}));
