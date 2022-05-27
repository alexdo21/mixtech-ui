import { PLAYLIST_ENDPOINT, REQUEST } from ".";
import { GET_ALL_PLAYLISTS, GET_ALL_SONGS_IN_PLAYLIST, CREATE_PLAYLIST, ADD_SONG_TO_PLAYLIST, DELETE_PLAYLIST } from "./types"

const getAllPlaylists = () => dispatch => {
    REQUEST.method = "GET"
    REQUEST.headers["Authorization"] = `Bearer ${localStorage.getItem("access_token")}`
    delete REQUEST.body
    fetch(`${PLAYLIST_ENDPOINT}/all`, REQUEST)
    .then(res => res.json())
    .then(res => {
        if (res.status === "Success") {
            const results = res.playlists.map(playlist => ({
                id: playlist.id,
                name: playlist.name,
                description: playlist.description
            }));
            dispatch({
                type: GET_ALL_PLAYLISTS,
                payload: results
            })
        } else {
            console.log(res.errorMessage)
        }
    }).catch(err => {console.log(err)});
};

const getAllSongsInPlaylist = (playlistId) => dispatch => {
    REQUEST.method = "GET"
    REQUEST.headers["Authorization"] = `Bearer ${localStorage.getItem("access_token")}`
    delete REQUEST.body
    fetch(`${PLAYLIST_ENDPOINT}/songs/${playlistId}`, REQUEST)
    .then(res => res.json())
    .then(res => {
        if (res.status === "Success") {
            const songs = res.songs.map(song => ({
                id: song.spotifyId,
                name: song.name,
                albumName: song.albumName,
                artist: song.artistName,
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
                duration: song.durationMs,
                timeSignature: song.timeSignature,
                popularity: song.popularity
            }))
            dispatch({ 
                type: GET_ALL_SONGS_IN_PLAYLIST,
                payload: songs
            })
        } else {
            console.log(res.errorMessage)
        }
    }).catch(err => console.log(err))
}

const createPlaylist = (data) => dispatch => {
    REQUEST.method = "POST"
    REQUEST.body = JSON.stringify(data)
    REQUEST.headers["Authorization"] = `Bearer ${localStorage.getItem("access_token")}`
    fetch(`${PLAYLIST_ENDPOINT}/create`, REQUEST)
    .then(res => res.json())
    .then(res => res.status === "Success" ? dispatch({ type: CREATE_PLAYLIST }) : console.log(res.errorMessage))
    .catch(err => console.log(err))
}

const addSongToPlaylist = (req) => dispatch => {
    REQUEST.method = "POST"
    REQUEST.headers["Authorization"] = `Bearer ${localStorage.getItem("access_token")}`
    fetch(`${PLAYLIST_ENDPOINT}/songs/add/${req.playlistId}?songId=${req.songId}`, REQUEST)
    .then(res => res.json())
    .then(res => res.status === "Success" ? dispatch({ type: ADD_SONG_TO_PLAYLIST }) : console.log(res.errorMessage))
    .catch(err => console.log(err))
}

const deletePlaylist = (playlistId) => dispatch => {
    REQUEST.method = "DELETE"
    REQUEST.headers["Authorization"] = `Bearer ${localStorage.getItem("access_token")}`
    fetch(`${PLAYLIST_ENDPOINT}/delete/${playlistId}`, REQUEST)
    .then(res => res.json())
    .then(res => res.status === "Success" ? dispatch({ type: DELETE_PLAYLIST, payload: Number(playlistId) }) : console.log(res.errorMessage))
    .catch(err => console.log(err))
}

export { getAllPlaylists, getAllSongsInPlaylist, createPlaylist, addSongToPlaylist, deletePlaylist };