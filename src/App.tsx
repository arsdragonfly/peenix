import {
  AppBar,
  Divider,
  Drawer as DrawerMui,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { Theme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import * as React from "react";
import { Route, Router } from "react-router-dom";
import { history } from "./store";
import { WWYDPage } from "./pages";
import { withRoot } from "./withRoot";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    height: "100%",
    zIndex: 1,
    overflow: "hidden"
  },
  appFrame: {
    position: "relative",
    display: "flex",
    width: "100%",
    height: "100%"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    position: "absolute"
  },
  navIconHide: {
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  drawerHeader: theme.mixins.toolbar,
  drawerPaper: {
    width: 250,
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      position: "relative",
      height: "100%"
    }
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: "100%",
    height: "calc(100% - 56px)",
    marginTop: 56,
    [theme.breakpoints.up("sm")]: {
      height: "calc(100% - 64px)",
      marginTop: 64
    }
  }
}));

const Routes: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <Route exact={true} path="/" component={WWYDPage} />
      <Route exact={true} path="/home" component={WWYDPage} />
    </div>
  );
};

const Drawer: React.FC = () => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.drawerHeader} />
      <Divider />
      <List>
        <ListItem button onClick={() => history.push("/")}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
      </List>
      <Divider />
    </div>
  );
};

const App: React.FC = () => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = (): void => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Router history={history}>
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                className={classes.navIconHide}
                size="large"
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" noWrap={isMobile}>
                Peenix
              </Typography>
            </Toolbar>
          </AppBar>
          <DrawerMui
            variant="temporary"
            anchor={"left"}
            open={mobileOpen}
            classes={{
              paper: classes.drawerPaper
            }}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            <Drawer />
          </DrawerMui>
          <Routes />
        </div>
      </div>
    </Router>
  );
};

export default withRoot(App);
