import React from "react";
import { Sidebar } from "../../components"
import { Matches, Playlists, Search, AdvancedSearch } from "../"
import { getUserInfo, getUserAccessToken } from "../../services";
import { GET_USER_INFO, SPOTIFY_PLAYER_READY, SPOTIFY_PLAYER_NOT_READY } from "../../reducers/types"
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

    React.useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.body.appendChild(script);
        
        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new window.Spotify.Player({
                name: "MixTech Player",
                getOAuthToken: callback => {
                    getUserAccessToken()
                    .then(accessToken => {
                        callback(accessToken); 
                    }).catch(err => console.log(err))
                }
            });
            player.addListener("ready", ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
                dispatch({ type: SPOTIFY_PLAYER_READY, payload: device_id })
            });
            player.addListener("not_ready", ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
                dispatch({ type: SPOTIFY_PLAYER_NOT_READY })
            });
            player.addListener("player_state_changed", ({ position, duration, track_window: { current_track } }) => {
                // console.log("Currently Playing", current_track);
                // console.log("Position in Song", position);
                // console.log("Duration of Song", duration);
            });
            player.connect();
        };
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