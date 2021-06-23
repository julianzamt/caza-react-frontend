import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import NavigationDrawer from "./NavigationDrawer";
import ListIcon from "@material-ui/icons/List";
import { ReactComponent as CazaIcon } from "../icons/logo.svg";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [showDrawer, setShowDrawer] = useState(false);

  const handleClick = () => {
    setShowDrawer(!showDrawer);
  };

  return (
    <div>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar className="navbar__container">
          <Link to="/" className="navbar__logoAndTitle__container">
            <CazaIcon className="cazaicon" />
            <div className="title__container">
              <div className="title">CAZA ESTUDIO</div>
            </div>
          </Link>
          <IconButton color="inherit" aria-label="menu" onClick={handleClick}>
            <ListIcon color="primary" />
          </IconButton>
        </Toolbar>
        <NavigationDrawer showDrawer={showDrawer} setShowDrawer={setShowDrawer} />
      </AppBar>
    </div>
  );
}
