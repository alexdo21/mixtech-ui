import React from 'react';
import { startSong, resumeSong, pauseSong } from "../../services"
import { useSelector } from "react-redux";

function SpotifyPlayer({ song }) {
    const [isPlaying, setIsPlaying] = React.useState(false)
    const [started, setStarted] = React.useState(false)
    console.log(song)

    const deviceId = useSelector(state => state.userReducer.deviceId)

    React.useEffect(() => {
        return () => {
            pauseSong(deviceId)
            .catch(err => console.log(err))
        }
    }, [deviceId])

    const togglePlay = () => {
        if (!started) {
            startSong(song.spotifyId, deviceId)
            .then(() => {
                setIsPlaying(true)
                setStarted(true)
            }).catch(err => console.log(err))
        } else {
            if (isPlaying) {
                pauseSong(deviceId)
                .then(() => setIsPlaying(false))
                .catch(err => console.log(err))
            } else {
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