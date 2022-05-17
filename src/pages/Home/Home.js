import React from "react";
import { Sidebar } from "../../components"
import { Matches, Playlists, Search, AdvancedSearch } from "../"

import { Routes, Route } from "react-router-dom"
import "./Home.css"


/**
 * The authenticated user will be redirected to this home page.
 * Defines a sidebar as the navigation bar for MixTech and defines several
 * browser routes for the user each with their corresponding
 * component and functionality.
 */
function Home() {
    return (
        <div id="home">
            <Sidebar />
            <Routes>
                <Route exact path="/" element={<Matches />} />
                <Route path="/playlists" element={<Playlists />} />
                <Route path="/search" element={<Search />} />
                <Route path="/advancedsearch" element={<AdvancedSearch />} />
            </Routes>
        </div>
    )
}

export { Home };