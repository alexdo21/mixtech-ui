import React from 'react';
import { startSong, resumeSong, pauseSong, UNAUTHORIZED, ACCESS_TOKEN } from "../../services"
import { SWITCH_SONG, LOGOUT } from '../../reducers/types';
import { useSelector, useDispatch } from "react-redux";

function SpotifyPlayer({song}) {
    const [isPlaying, setIsPlaying] = React.useState(false)
    const [started, setStarted] = React.useState(false)

    const deviceId = useSelector(state => state.userReducer.deviceId)
    const currentSong = useSelector(state => state.userReducer.currentSong)
    const dispatch = useDispatch()

    React.useEffect(() => {
        if (currentSong !== song.spotifyId) {
            setStarted(false)
            setIsPlaying(false)
        }
    }, [currentSong, song])

    React.useEffect(() => {
        return () => {
            if (localStorage.getItem(ACCESS_TOKEN) && currentSong) {
                pauseSong(deviceId)
                .then(() => setIsPlaying(false))
                .catch(err => err === UNAUTHORIZED ? dispatch({ type: LOGOUT }) : console.log(err))
            }
        }
    }, [currentSong, deviceId, dispatch])

    const togglePlay = (event) => {
        const songId = song.spotifyId
        if (!started) {
            console.log("Starting ", song.name, song.spotifyId)
            startSong(songId, deviceId)
            .then(() => {
                dispatch({ type: SWITCH_SONG, payload: songId })
                setIsPlaying(true)
                setStarted(true)
            }).catch(err => err === UNAUTHORIZED ? dispatch({ type: LOGOUT }) : console.log(err))
        } else {
            if (isPlaying) {
                console.log("Pausing  ", song.name)
                pauseSong(deviceId)
                .then(() => setIsPlaying(false))
                .catch(err => err === UNAUTHORIZED ? dispatch({ type: LOGOUT }) : console.log(err))
            } else {
                console.log("Resuming  ", song.name)
                resumeSong(deviceId)
                .then(() => setIsPlaying(true))
                .catch(err => err === UNAUTHORIZED ? dispatch({ type: LOGOUT }) : console.log(err))
            }
        }
        event.target.blur()
    }

    return (
        <button className="btn btn-light btn-lg shadow-none" onClick={togglePlay}>{ isPlaying ? <i className="fa fa-pause"></i> : <i className="fa fa-play"></i> }</button>
    );
}

export { SpotifyPlayer };