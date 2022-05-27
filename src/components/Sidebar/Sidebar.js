import React from "react";
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import { logout } from "../../actions"
import { connect } from "react-redux"
import "./Sidebar.css"


function Sidebar({logout, user}) {
    return (
        <nav className="navbar" id="sidebar">
            <div className="navbar-brand sidebar-header">
                <Link to={"/matches"}><h1>MixTech</h1></Link>
                <h5>Logged in as: {user !== null ? user.name : ""}</h5>
            </div>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to={"/matches"}><h4>Matches</h4></Link>
                </li>
                <li className="nav-item">
                    <Link to={"/playlists"}><h4>Playlists</h4></Link>
                </li>
                <li className="nav-item">
                    <Link to={"/search"}><h4>Search</h4></Link>
                </li>
                <li className="nav-item">
                    <Link to={"/advancedsearch"}><h4>Advanced Search</h4></Link>
                </li>
            </ul>
            <button onClick={logout} id="logout" className="btn btn-secondary justify-content-end">Logout</button>
        </nav>
    )
}

Sidebar.propTypes = {
    logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    user: state.userReducer.user
})

export const ConnectedSidebar = connect(mapStateToProps, { logout })(Sidebar);