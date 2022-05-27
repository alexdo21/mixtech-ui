import React from "react";
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Sidebar } from "../../components"
import { Matches, Playlists, Search, AdvancedSearch } from "../"
import { getUserInfo } from "../../actions";
import { Routes, Route } from "react-router-dom"
import { Navigate } from "react-router"
import "./Home.css"

function Home({getUserInfo, isAuthenticated}) {
    React.useEffect(() => {
        const fetchUserInfo = async () => {
            await getUserInfo()
        }
        fetchUserInfo()
    }, [getUserInfo])

    console.log(isAuthenticated)
    return (
        <div id="home">
            <Sidebar />
            <Routes>
                <Route exact path="/" element={<Matches />} />
                <Route path="/matches" element={<Matches />} />
                <Route path="/playlists" element={<Playlists />} />
                <Route path="/search" element={<Search />} />
                <Route path="/advancedsearch" element={<AdvancedSearch />} />
            </Routes>
        </div>
    )
}

Home.propTypes = {
    getUserInfo: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.userReducer.isAuthenticated
})

export const ConnectedHome = connect(mapStateToProps, { getUserInfo })(Home);