import React from "react";
import { Sidebar, SessionTimeout } from "../../components"
import { Matches, Playlists, Search, AdvancedSearch } from "../"
import { getUserInfo, getUserAccessToken } from "../../services";
import { GET_USER_INFO, SPOTIFY_PLAYER_READY, SPOTIFY_PLAYER_NOT_READY } from "../../reducers/types"
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom"
import "./Home.css"

function Home() {
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
        
        var player;
        window.onSpotifyWebPlaybackSDKReady = () => {
            player = new window.Spotify.Player({
                name: "MixTech Player",
                getOAuthToken: callback => {
                    getUserAccessToken()
                    .then(accessToken => {
                        callback(accessToken); 
                    }).catch(err => console.log(err))
                }
            });
            player.addListener("ready", ({ device_id }) => {
                dispatch({ type: SPOTIFY_PLAYER_READY, payload: device_id })
            });
            player.addListener("not_ready", () => {
                dispatch({ type: SPOTIFY_PLAYER_NOT_READY })
            });
            player.connect();
        };
        return () => { if (player) player.disconnect() }
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
            <SessionTimeout />
        </div>
    )
}

export { Home };