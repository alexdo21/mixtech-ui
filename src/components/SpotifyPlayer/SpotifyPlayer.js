import React from 'react';
import { startSong, resumeSong, pauseSong } from "../../services"
import { SWITCH_SONG } from '../../reducers/types';
import { useSelector, useDispatch } from "react-redux";

function SpotifyPlayer({ song }) {
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
    }, [currentSong])

    React.useEffect(() => {
        return () => {
            pauseSong(deviceId)
            .catch(err => console.log(err))
        }
    }, [deviceId])

    const togglePlay = () => {
        const songId = song.spotifyId
        if (!started) {
            console.log("Starting ", song.name, song.spotifyId)
            startSong(songId, deviceId)
            .then(() => {
                dispatch({ type: SWITCH_SONG, payload: songId })
                setIsPlaying(true)
                setStarted(true)
            }).catch(err => console.log(err))
        } else {
            if (isPlaying) {
                console.log("Pausing  ", song.name)
                pauseSong(deviceId)
                .then(() => setIsPlaying(false))
                .catch(err => console.log(err))
            } else {
                console.log("Resuming  ", song.name)
                resumeSong(deviceId)
                .then(() => setIsPlaying(true))
                .catch(err => console.log(err))
            }
        }
    }

    return (
        <button className="btn btn-light btn-lg" onClick={togglePlay}>{ isPlaying ? "\u23F8" : "\u25B6" }</button>
    );
}

export { SpotifyPlayer };