import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import AirplayIcon from "@material-ui/icons/Airplay";
import SettingsIcon from "@material-ui/icons/Settings";
import AddClient from "./AddClient";
import { BrowserRouter, Link, Route } from "react-router-dom";
import ClientManagement from "./ClientManagement";
import AiManagement from "./AiManagement";
import Settings from "./Settings";
import { useSnackbar } from "notistack";
import { handleNotification } from "../utils";
import { userLogin } from "../Services/Api";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    backgroundColor: "white",
    color: "black",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: {
    ...theme.mixins.toolbar,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
  },
  navList: {
    marginTop: "3rem",
  },
  listItem: {
    margin: "1rem 0px",
  },
}));

const Home = (props) => {
  const { user } = props;
  const [currentPage, setCurrentPage] = useState("Client Management");
  const { window, setUser } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    handleNotification(enqueueSnackbar, "Logged Out", "error");
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [key, setKey] = useState("");

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <h1>FaceGenie</h1>
      </div>
      <Divider />
      {user.isSuperAdmin ? (
        <List className={classes.navList}>
          {[
            {
              title: "Client Management",
              icon: <PeopleAltIcon />,
              path: "/client-management",
            },
            {
              title: "Add Client",
              icon: <GroupAddIcon />,
              path: "/add-client",
            },
            {
              title: "AI Management",
              icon: <AirplayIcon />,
              path: "/ai-management",
            },
            { title: "Settings", icon: <SettingsIcon />, path: "/settings" },
          ].map(({ title, icon, path }, index) => (
            <Link key={path} to={path} onClick={(e) => setCurrentPage(title)}>
              <ListItem className={classes.listItem} button key={title}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={title} />
              </ListItem>
            </Link>
          ))}
        </List>
      ) : null}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap>
            {user.isSuperAdmin ? currentPage : ""}
          </Typography>
          <Button
            className="ml-auto"
            variant="contained"
            color="secondary"
            onClick={logout}
          >
            LOGOUT
          </Button>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content} key={currentPage}>
        <div className={classes.toolbar} />

        <h1 className="text-center mt-5">
          {user.adminUserName
            ? "logged in as Admin"
            : user.managementUserName
            ? "logged in as manager"
            : ""}
        </h1>
        {user.isSuperAdmin ? (
          <BrowserRouter>
            <Route path="/add-client">
              <AddClient key={"1"} />
            </Route>
            <Route path="/client-management">
              <ClientManagement key={"2"} />
            </Route>
            <Route path="/ai-management">
              <AiManagement key={"3"} />
            </Route>
            <Route path="/settings">
              <Settings key={"4"} />
            </Route>
          </BrowserRouter>
        ) : null}
      </main>
    </div>
  );
};

export default Home;
