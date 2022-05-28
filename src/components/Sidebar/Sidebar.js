import React from "react";
import { Link } from "react-router-dom"
import { logout } from "../../services"
import { LOGOUT } from "../../reducers/types"
import { useSelector, useDispatch } from "react-redux";
import "./Sidebar.css"


function Sidebar() {
    const user = useSelector(state => state.userReducer.user)
    const dispatch = useDispatch()

    const handleLogout = () => {
        logout()
        .then(() => dispatch({ type: LOGOUT }))
    }

    return (
        <nav className="navbar" id="sidebar">
            <div className="navbar-brand sidebar-header">
                <Link to={"/matches"}><h1>MixTech</h1></Link>
                <h5>{user !== null ? user.name : ""}</h5>
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
            <button onClick={handleLogout} id="logout" className="btn btn-secondary justify-content-end">Logout</button>
        </nav>
    )
}

export { Sidebar };