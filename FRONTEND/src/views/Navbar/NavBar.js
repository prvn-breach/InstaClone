import React, { Component } from 'react'

import "./NavBar.css";

import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export default class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-sm fixed-top navbar-light border-bottom bg-white" style={{ padding: '.1rem 1rem' }}>
                <div className="container">
                    <a href="" className="navbar-brand">
                        <img 
                            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                        />
                    </a>

                    <input 
                        id="search"
                        type="search" 
                        className="form-control form-control-sm bg-light"
                        placeholder="Search"
                    />


                    {/* <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarNav7">
                        <span className="navbar-toggler-icon"></span>
                    </button> */}

                    {/* <div className="navbar-collapse" id="navbarNav7" style={{ 'flexGrow': 0 }}> */}
                    <div>
                    <ul className="navbar-nav ml-auto" style={{flexDirection: "row"}}>
                            <li className="nav-item">
                                <IconButton  component="span">
                                    <HomeIcon />
                                </IconButton>
                            </li>
                            <li className="nav-item">
                                <IconButton  component="span">
                                    <AccountCircleIcon />
                                </IconButton>
                             </li>
                        </ul>
                    </div>
                    {/* </div> */}
                </div>
            </nav>
        )
    }
}