import React from 'react';
import { startSong, resumeSong, pauseSong, UNAUTHORIZED, ACCESS_TOKEN } from "../../services"
import { SWITCH_SONG, LOGOUT } from '../../reducers/types';
import { useSelector, useDispatch } from "react-redux";
import "./SpotifyPlayer.css"

function SpotifyPlayer({song}) {
    const [isPlaying, setIsPlaying] = React.useState(false)
    const [started, setStarted] = React.useState(false)

    const deviceId = useSelector(state => state.userReducer.deviceId)
    const currentSong = useSelector(state => state.userReducer.currentSong)
    const dispatch = useDispatch()

    React.useEffect(() => {
        if (currentSong !== song.spotifyId) {
            setIsPlaying(false)
            setStarted(false)
        }
    }, [currentSong, song])

    React.useEffect(() => {
        return () => {
            if (localStorage.getItem(ACCESS_TOKEN)) {
                pauseSong(deviceId)
                .then(() => setIsPlaying(false))
                .catch(err => err === UNAUTHORIZED ? dispatch({ type: LOGOUT }) : console.log(err))
            }
        }
    }, [deviceId, dispatch])

    const togglePlay = () => {
        const songId = song.spotifyId
        if (!started) {
            startSong(songId, deviceId)
            .then(() => {
                dispatch({ type: SWITCH_SONG, payload: songId })
                setIsPlaying(true)
                setStarted(true)
            }).catch(err => err === UNAUTHORIZED ? dispatch({ type: LOGOUT }) : console.log(err))
        } else {
            if (isPlaying) {
                pauseSong(deviceId)
                .then(() => setIsPlaying(false))
                .catch(err => err === UNAUTHORIZED ? dispatch({ type: LOGOUT }) : console.log(err))
            } else {
                resumeSong(deviceId)
                .then(() => setIsPlaying(true))
                .catch(err => err === UNAUTHORIZED ? dispatch({ type: LOGOUT }) : console.log(err))
            }
        }
    }

    return (
        <button className="btn" onClick={togglePlay}>{ isPlaying ? <i className="fa fa-pause"></i> : <i className="fa fa-play"></i> }</button>
    );
}

export { SpotifyPlayer };