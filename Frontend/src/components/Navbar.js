import React, { useState } from "react";
import Appbar from "@material-ui/core/Appbar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import { Button, ListItem, List, ListItemText } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
  },
  appBar: {
    display: "flex",
    color: "#2835b3",
    justifyContent: "start",
    alignItems: "start",
  },
  title: {
    flexGrow: 1,
    fontWeight: 800,
  },
  logo: {
    objectFit: "contain",
    width: "100%",
    height: "100%",
  },
  avatar: {
    fontWeight: "bolder",
    backgroundColor: "#2835b3",
    color: "white",
    "&:hover": {
      backgroundColor: "#0a0653",
    },
  },
  profile: {
    color: "#1f1235",
    fontWeight: 900,
    display: "flex",
    placeItems: "center",
    fontSize: 18,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const [stateOfDrawer, setStateOfDrawer] = useState(false);
  const user = useSelector((state) => state.user.currentUser);

  let loggedIn = Boolean(user);
  let isAdmin = Boolean(user && user.role === "teacher"),
    list;
  if (loggedIn && isAdmin)
    list = [
      { key: 1, name: "Add Exam", path: "/teacher/create" },
      { key: 2, name: "Results", path: "/teacher/results" },
      { key: 3, name: "My Exams", path: "/teacher/exams" },
      { key: 5, name: "Signout", path: "/signout" },
    ];
  else if (loggedIn && !isAdmin)
    list = [
      { key: 1, name: "Attend Exam", path: "/student/examcode" },
      { key: 2, name: "Results", path: "/student/results" },
      { key: 5, name: "Signout", path: "/signout" },
    ];
  else if (!isAdmin) {
    list = [
      { key: 1, name: "Signin", path: "/student/signin" },
      { key: 2, name: "Signup", path: "/student/signup" },
    ];
  } else {
    list = [
      { key: 1, name: "Signin", path: "/teacher/signin" },
      { key: 2, name: "Signup", path: "/teacher/signup" },
    ];
  }

  const toggleDrawer = () => {
    setStateOfDrawer(!stateOfDrawer);
  };
  return (
    <div className={classes.root}>
      <Appbar component="nav" className={classes.appBar}>
        <Toolbar>
          <IconButton onClick={toggleDrawer}>
            <MenuIcon style={{ color: "#fff" }} />
          </IconButton>
          <Typography
            className={classes.title}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "800",
            }}
            variant="h5">
            <Link style={{ color: "#fff", textDecoration: "none" }} to="/">
              Examly
            </Link>
          </Typography>
          {/* {loggedIn ? (
            <Link
              className={classes.profile}
              to={`/users/${(user && user.roll) || 1818126}`}>
              <IconButton>
                <Avatar className={classes.avatar}>
                  {name && name[0].toUpperCase()}
                </Avatar>
              </IconButton>
            </Link>
          ) : (
            <Link to="/users/signin">
              <Button
                style={{ fontWeight: "bolder" }}
                variant="contained"
                color="secondary">
                Signin
              </Button>
            </Link>
          )} */}
        </Toolbar>
      </Appbar>
      <SwipeableDrawer
        open={stateOfDrawer}
        onClose={() => setStateOfDrawer(false)}
        onOpen={() => setStateOfDrawer(true)}>
        <Link
          to="/"
          style={{
            fontWeight: "bold",
            textDecoration: "none",
            color: "#3f51b5",
            padding: 20,
          }}
          onClick={() => setStateOfDrawer(false)}>
          <Typography variant="h3" style={{ fontWeight: "bolder" }}>
            EXAMLY
          </Typography>
        </Link>
        <Divider />
        <List component="nav">
          {list.map((item) => (
            <Link
              key={item.key}
              style={{
                textDecoration: "none",
                fontWeight: "800",
                fontSize: 20,
              }}
              onClick={() => setStateOfDrawer(false)}
              to={item.path}>
              <ListItem
                style={{
                  textDecoration: "none",
                  fontWeight: "800",
                  fontSize: 20,
                }}
                button
                divider>
                <ListItemText
                  color="primary"
                  style={{
                    textDecoration: "none",
                    fontWeight: "800",
                    fontSize: 20,
                  }}
                  className={classes.navLink}
                  primary={item.name}
                />
              </ListItem>
            </Link>
          ))}
        </List>
      </SwipeableDrawer>
    </div>
  );
};

export default Navbar;
