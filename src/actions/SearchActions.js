import { SEARCH_ENDPOINT, REQUEST } from "."
import { GET_SONGS_BY_SONG_NAME, GET_SONGS_BY_AUDIO_FEATURES, CLEAR_SEARCH_RESULTS } from "./types"

const getSongsBySongName = (query) => dispatch => {
    REQUEST.method = "GET"
    REQUEST.headers["Authorization"] = `Bearer ${localStorage.getItem("access_token")}`
    delete REQUEST.body
    fetch(`${SEARCH_ENDPOINT}/basic?songName=${query.songName}`, REQUEST)
    .then(res => res.json())
    .then(res => {
        if (res.status === "Success") {
            const results = res.songs.map(song => ({
                id: song.spotifyId,
                name: song.name,
                albumName: song.albumName,
                artistName: song.artistName,
                danceability: song.danceability,
                energy: song.energy,
                key: song.key,
                loudness: song.loudness,
                mode: song.mode,
                speechiness: song.speechiness,
                acousticness: song.acousticness,
                instrumentalness: song.instrumentalness,
                liveness: song.liveness,
                valence: song.valence,
                tempo: song.tempo,
                durationMs: song.durationMs,
                timeSignature: song.timeSignature,
                popularity: song.popularity
            }))
            dispatch({
                type: GET_SONGS_BY_SONG_NAME,
                payload: results
            })
        } else {
            console.log(res.errorMessage)
        }
    }).catch(err => {console.log(err)})
}

const getSongsByAudioFeatures = (query) => dispatch => {
    REQUEST.method = "POST"
    REQUEST.body = JSON.stringify(query)
    REQUEST.headers["Authorization"] = `Bearer ${localStorage.getItem("access_token")}`
    fetch(`${SEARCH_ENDPOINT}/advanced`, REQUEST)
    .then(res => res.json())
    .then(res => {
        if (res.status === "Success") {
            const results = res.songs.map(song => ({
                id: song.spotifyId,
                name: song.name,
                albumName: song.albumName,
                artistName: song.artistName,
                danceability: song.danceability,
                energy: song.energy,
                key: song.key,
                loudness: song.loudness,
                mode: song.mode,
                speechiness: song.speechiness,
                acousticness: song.acousticness,
                instrumentalness: song.instrumentalness,
                liveness: song.liveness,
                valence: song.valence,
                tempo: song.tempo,
                durationMs: song.durationMs,
                timeSignature: song.timeSignature,
                popularity: song.popularity
            }))
            console.log(results)
            dispatch({
                type: GET_SONGS_BY_AUDIO_FEATURES,
                payload: results
            })
        } else {
            console.log(res.errorMessage)
        }
    }).catch(err => console.log(err))
}

const clearSearchResults = () => dispatch => {
    dispatch({
        type: CLEAR_SEARCH_RESULTS,
        payload: []
    })
}

export { getSongsBySongName, getSongsByAudioFeatures, clearSearchResults };