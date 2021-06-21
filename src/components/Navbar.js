import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ListIcon from '@material-ui/icons/List';
import { ReactComponent as CazaIcon } from '../icons/logo.svg'
import './Navbar.css'

export default function Navbar() {
    return (
        <div >
            <AppBar position="static" color="transparent" elevation={0}>
                <Toolbar className="navbar__container">
                    <div className="logo-title__container">
                        <CazaIcon className="cazaicon" />
                        <div className="title__container">
                            <div className="title">CAZA ESTUDIO</div>
                            {/* <div className="subtitle">Arquitectas</div> */}
                        </div>
                    </div>
                    <IconButton color="inherit" aria-label="menu">
                        <ListIcon color="primary" />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
}