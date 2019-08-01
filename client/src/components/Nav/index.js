import React from "react";
import "./style.css";

function Nav() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
            <div className="container">
                <a className="navbar-brand" href="/">
                    Your Calendar
                </a>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Select Page
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" href="/dashboard">Dashboard</a>
                                    <a className="dropdown-item" href="/create">Create Event</a>
                                    <a className="dropdown-item" href="/friends">Friends</a>
                                    <a className="dropdown-item" href="/profile">Profile</a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <span id="user-name-holder" data-name="" data-email=""></span>
                <button id="authorize_button" style={{"display": "none"}}>Sign in With Google</button>
                <button id="signout_button" style={{"display": "none"}}>Sign Out</button>
            </div>
        </nav>
    );
}

export default Nav;
