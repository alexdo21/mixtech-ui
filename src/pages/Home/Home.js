import React from "react";
import { Sidebar } from "../../components"
import { Matches, Playlists, Search, AdvancedSearch } from "../"
import { getUserInfo } from "../../services";
import { GET_USER_INFO } from "../../reducers/types"
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom"
import { Navigate } from "react-router"
import "./Home.css"

function Home() {
    const isAuthenticated = useSelector(state => state.userReducer.isAuthenticated)
    const dispatch = useDispatch()

    React.useEffect(() => {
        getUserInfo()
        .then(user => dispatch({ type: GET_USER_INFO, payload: user }))
        .catch(err => console.log(err))
    }, [dispatch])

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

export { Home };