import React, { Component } from 'react'
import { Link } from "react-router-dom";

import "./NavBar.css";

import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export default class NavBar extends Component {
    render() {
        return (
            <nav id="top-navbar" className="navbar navbar-expand-sm fixed-top navbar-light border-bottom bg-white" style={{ padding: '.1rem 1rem' }}>
                <div className="container">
                    <Link id="top-navbar-brand" to="/newsfeed" className="navbar-brand">
                        <img
                            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                        />
                    </Link>

                    <input
                        id="search"
                        type="search"
                        className="form-control form-control-sm bg-light"
                        placeholder="Search"
                    />

                    <div>
                        <ul id="top-navbar-nav" className="navbar-nav ml-auto" style={{ flexDirection: "row" }}>
                            <li className="nav-item">
                                <IconButton component="span">
                                    <HomeIcon />
                                </IconButton>
                            </li>
                            <li className="nav-item">
                                <IconButton component="span">
                                    <AccountCircleIcon />
                                </IconButton>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}
