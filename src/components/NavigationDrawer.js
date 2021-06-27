import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { ReactComponent as CazaIcon } from "../icons/logo.svg";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  list: {
    width: 250,
    height: "100%",
    backgroundColor: "rgba(137, 137, 137, 0.6)",
    fontFamily: "Source Sans Pro",
    padding: "2em",
  },
  link: {
    textDecoration: "none !important",
  },
  listItemText: {
    color: "white",
    "&:hover": {
      color: "#e2e2c7 ",
    },
    "& span, & svg": {
      fontSize: "1.5rem",
    },
    borderBottom: "0.5px solid lightgray",
  },
});

export default function TemporaryDrawer({ showDrawer, setShowDrawer }) {
  const classes = useStyles();

  const toggleDrawer = open => event => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setShowDrawer(open);
  };

  const list = () => (
    <div className={clsx(classes.list)} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        <CazaIcon style={{ width: 50, marginLeft: "0.8em", marginBottom: "2em", marginTop: "1em" }} />
        {links.map(link => (
          <Link to={link.path && link.path} className={clsx(classes.link)}>
            <ListItem button key={link.text}>
              <ListItemText primary={link.text} className={clsx(classes.listItemText)} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  const links = [
    { text: "Obras", path: "/obras" },
    { text: "Proyectos", path: "/proyectos" },
    { text: "Equipamientos", path: "/equipamientos" },
    { text: "Productos", path: "/productos" },
    { text: "Documentación", path: "/documentacion" },
    { text: "Nosotras", path: "/aboutus" },
  ];

  return (
    <div>
      <React.Fragment>
        <Drawer open={showDrawer} onClose={toggleDrawer(false)} anchor="right" transitionDuration={{ enter: 400, exit: 150 }}>
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
